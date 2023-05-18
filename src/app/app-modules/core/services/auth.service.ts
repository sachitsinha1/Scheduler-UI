import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { environment } from 'environments/environment';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {

  constructor(
    private router: Router,
    private http: Http) { }

  login(userName: string, password: string) {
    return this.http.post(environment.loginUrl, { userName: userName, password: password })
      .map(res => res.json());
  }

  getUserSecurityQuestionsAnswer(uname: any): Observable<any> {
    return this.http.post(environment.getUserSecurityQuestionsAnswerUrl, { 'userName': uname.toLowerCase() })
      .map(res => res.json().data)
  };

  getSecurityQuestions() {
    return this.http.get(environment.getSecurityQuestionUrl)
      .map(res => res.json())
  }

  saveUserSecurityQuestionsAnswer(userQuestionAnswer) {
    return this.http.post(environment.saveUserSecurityQuestionsAnswerUrl, userQuestionAnswer)
      .map(res => res.json())
  }

  setNewPassword(userName: string, password: string) {
    return this.http.post(environment.setNewPasswordUrl, { 'userName': userName, 'password': password })
      .map(res => res.json())
  };

  logout() {
    return this.http.post(environment.logoutUrl, '')
      .map((res) => res.json());
  }

  validateSessionKey() {
    return this.http.post(environment.getSessionExistsURL, {})
      .map(res => res.json());
  }
  getSwymedLogout() {
    return this.http.get(environment.getSwymedLogoutUrl)
      .map(res => res.json())
      .catch(err => {
        return Observable.throw(err);
      })
  }
  getUIVersionAndCommitDetails(url) {
    return this.http.get(url)
      .map((res) => res.json());
  }
  getAPIVersionAndCommitDetails() {
    return this.http.get(environment.apiVersionUrl)
      .map((res) => res.json());
  }
  removeExternalSessionData() {
    sessionStorage.removeItem('tm-fallback');
    sessionStorage.removeItem('tm-return');
    sessionStorage.removeItem('tm-parentLogin');
    sessionStorage.removeItem('tm-host');
    sessionStorage.removeItem('tm-key');
    sessionStorage.removeItem('tm-isAuthenticated');

    localStorage.removeItem('tm-designation');
    localStorage.removeItem('tm-roles');
    localStorage.removeItem('tm-userName');
    localStorage.removeItem('tm-userID');
    localStorage.removeItem('tm-providerServiceMapID');
  }
}
