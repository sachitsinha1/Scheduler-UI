import { Injectable } from '@angular/core';
import { Http, ConnectionBackend, RequestOptions, RequestOptionsArgs, Response, Headers, Request } from '@angular/http';

import { SpinnerService } from './spinner.service';
import { ConfirmationService } from './confirmation.service';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { AuthService } from './auth.service';
import { SetLanguageComponent } from '../components/set-language.component';
import { HttpServiceService } from './http-service.service';

@Injectable()
export class HttpInterceptor extends Http {

  languageComponent : SetLanguageComponent;

  donotShowSpinnerUrl = [];
  timerRef: any;
  currentLanguageSet: any;

  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions,
    private router: Router,
    private spinnerService: SpinnerService,
    private confirmationService: ConfirmationService,
    private auth: AuthService,
    public httpServiceService: HttpServiceService,
  ) {

    super(backend, defaultOptions);

  }

  ngOnInit() {
    this.fetchLanguageResponse();
  }

  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    url = this.beforeRequest(url);
    return super.get(url, this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(url, res);
      }, (error: any) => {
        this.onError(error);
      });
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    url = this.beforeRequest(url);
    return super.post(url, body, this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(url, res);
      }, (error: any) => {
        this.onError(error);
      });
  }

  private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('tm-key'),
        'Access-control-Allow-origin': '*',
        'Cache-Control': 'no-store',
        'ServerAuthorization': localStorage.getItem('tm-serverKey')
      });
    }
    return options;
  }

  private beforeRequest(url, body?: any): string {
    console.log("loading............");
    this.spinnerService.show();
    if (sessionStorage.getItem('apimanClientKey'))
      return url + `?apiKey=${sessionStorage.getItem('apimanClientKey')}`;
    return url;
  }

  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    console.log("API error", error);
    return Observable.throw("Service not available");
  }

  private onSuccess(url, res: Response): void {
    console.log("success............");
    console.log("here", Date());
    let data = res.json();
    setTimeout(() => this.spinnerService.hide(), 500);

    if (this.timerRef)
      clearTimeout(this.timerRef);

    if (data.statusCode == 5002 && url.indexOf("user/userAuthenticate") < 0) {
      // sessionStorage.clear();
      this.spinnerService.clear();
      setTimeout(() => this.logOutToMMU(), 0);
    } else {
      this.startTimer();
    }
  }

  private logOutToMMU() {
    let logoutTMUrl = sessionStorage.getItem('tm-fallback');
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = logoutTMUrl;
  }

  private onError(error: any): void {
    console.log("error", error);
    this.spinnerService.clear();
  }

  startTimer() {
    this.timerRef = setTimeout(() => {
      console.log("there", Date());

      if (sessionStorage.getItem('tm-key') && sessionStorage.getItem('tm-isAuthenticated')) {
        this.confirmationService.startTimer("Want to continue your session ?", "Your Session is Going To Expire", 120)
          .subscribe(result => {
            if (result.action == 'continue') {
              this.post(environment.extendSessionUrl, {}).subscribe(res => { }, err => { });
            } else if (result.action == 'timeout') {
              clearTimeout(this.timerRef);
              this.confirmationService.alert(this.currentLanguageSet.sessionexpired, "error");
              this.logOutToMMU();
            } else if (result.action == 'cancel') {
              setTimeout(() => {
                clearTimeout(this.timerRef);
                this.confirmationService.alert(this.currentLanguageSet.sessionexpired, "error");
                this.logOutToMMU();
              }, result.remainingTime * 1000);
            }
          })
      }
    }, 27 * 60 * 1000);
  }

  // AV40085804 27/09/2021 Integrating Multilingual Functionality -----Start-----
  ngDoCheck() {
    this.fetchLanguageResponse();
  }

  fetchLanguageResponse() {
    this.languageComponent = new SetLanguageComponent(this.httpServiceService);
    this.languageComponent.setLanguage();
    this.currentLanguageSet = this.languageComponent.currentLanguageObject;
  }
  // -----End------
  
}
