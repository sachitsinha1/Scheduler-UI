import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { SetLanguageComponent } from '../components/set-language.component';
import { HttpServiceService } from './http-service.service';

@Injectable()
export class AuthGuard implements CanActivate {

  currentLanguageSet:any;
  languageComponent : SetLanguageComponent;

  constructor(
    private router: Router,
    public httpServiceService: HttpServiceService,
    private route: ActivatedRoute) { }

  // For setting language
  ngOnInit() {
    this.fetchLanguageResponse();
  }

  canActivate(route, state) {
    if (sessionStorage.getItem('tm-isAuthenticated')) {
      return true;
    }
    else {
      let componentName = route.component ? route.component.name : "";
      alert(this.currentLanguageSet.youAreNotAuthorised + componentName);
      this.router.navigate(['/redirin']);
      return false;
    }
  }

  // canActivateChild() {
  //   if (sessionStorage.getItem('isAuthenticated'))
  //     return true;
  //   else {
  //     this.router.navigate(['/login']);
  //   }
  // }

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
