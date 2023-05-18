import { Component, OnInit } from '@angular/core';
import { Params, RouterModule, Routes, Router, ActivatedRoute, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { SpinnerService } from '../app-modules/core/services/spinner.service';
import { Location } from '@angular/common';

import { AuthService } from '../app-modules/core/services/auth.service';
import { ConfirmationService } from '../app-modules/core/services/confirmation.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-redir-open',
  templateUrl: './redir-open.component.html',
  styleUrls: ['./redir-open.component.css']
})
export class RedirOpenComponent implements OnInit {

  externalSession = {
    protocol: '',
    host: '',
    fallbackURL: '',
    returnURL: '',
    parentApp: '',
    auth: '',
    username: '',
  }

  constructor(
    private router: Router,
    private spinnerService: SpinnerService,
    private route: ActivatedRoute,
    private location: Location,
    private auth: AuthService,
    private confirmationService: ConfirmationService,
    private authService: AuthService) { }

  ngOnInit() {
    this.extractExternalSessionDetailsFromUrl();
    this.setRouteStrate();
  }
   setRouteStrate() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.spinnerService.show();
      } else if (event instanceof NavigationEnd) {
        setTimeout(this.spinnerService.hide(), 500);
      } else if (event instanceof NavigationError ) {
        setTimeout(this.spinnerService.hide(), 500);
      } else {
        setTimeout(this.spinnerService.hide());
      }
    });
  }

  extractExternalSessionDetailsFromUrl() {
    let params = this.route.snapshot.queryParams;
    this.externalSession.protocol = params['protocol'] === 'undefined' ? undefined : params['protocol'];
    this.externalSession.host = params['host'] === 'undefined' ? undefined : params['host'];
    this.externalSession.fallbackURL = params['fallback'] === 'undefined' ? undefined : params['fallback'];
    this.externalSession.returnURL = params['back'] === 'undefined' ? undefined : params['back'];
    this.externalSession.parentApp = params['app'] === 'undefined' ? undefined : params['app'];
    this.externalSession.auth = params['user'] === 'undefined' ? undefined : params['user'];
    if (this.externalSession && this.externalSession.auth) {
      sessionStorage.setItem('tm-key', this.externalSession.auth);
      sessionStorage.setItem('tm-parentLogin', `${this.externalSession.protocol}//${this.externalSession.host}`);
      this.validateSessionKey();
    } else {
      this.confirmationService.alert("Can't access telemedicine directly")
        .subscribe(res => {
          this.auth.removeExternalSessionData();
          this.location.back();
        });
    }
  }

  validateSessionKey() {
    this.authService.validateSessionKey()
      .subscribe(res => {
        debugger;
   
        if (res.statusCode == 200 && res.data) {
          let TMPrevilegeObj = res.data.previlegeObj.filter(previlege => {
            if (previlege.roles[0].serviceRoleScreenMappings[0].providerServiceMapping.serviceID == '4') {
              return previlege;
            }
          });

          if (TMPrevilegeObj && TMPrevilegeObj.length > 0) {
            let roles = this.getUserRoles(TMPrevilegeObj[0]);
            let designation = this.getUserDesignation(res.data);

            let providerServiceMapID = TMPrevilegeObj[0].providerServiceMapID;
            sessionStorage.setItem("apimanClientKey", TMPrevilegeObj[0].apimanClientKey);
            let userName = res.data.userName;
            let userID = res.data.userID;
            this.storeExernalSessionData(this.externalSession, { providerServiceMapID, userName, designation, userID, roles });
            if (roles.length == 1 && roles[0] == 'Supervisor' && designation == 'Supervisor') {
              this.router.navigate(['/telemedicine/myStaff']);
            } else {
              this.router.navigate(['/telemedicine/timesheet/', designation])
            }
          } else {
            this.goBackToOrigin("Don't have previlege for TM");
          }
        } else {
          this.goBackToOrigin(res.errorMessage);
        }
      }, error => {
        this.goBackToOrigin(error);
      })
  }

  goBackToOrigin(error) {
    this.confirmationService.alert(error, 'error')
      .subscribe(res => {
        this.auth.removeExternalSessionData();
        this.location.back();
      });
  }

  storeExernalSessionData(externalSession, loginResponse) {
    sessionStorage.setItem('tm-fallback', `${this.externalSession.protocol}//${this.externalSession.host}#${this.externalSession.fallbackURL}`);
    sessionStorage.setItem('tm-return', `${this.externalSession.protocol}//${this.externalSession.host}#${this.externalSession.returnURL}`);
    sessionStorage.setItem('tm-parentLogin', `${this.externalSession.protocol}//${this.externalSession.host}`);
    sessionStorage.setItem('tm-host', `${this.externalSession.parentApp}`);
    sessionStorage.setItem('tm-key', this.externalSession.auth);
    sessionStorage.setItem('tm-isAuthenticated', 'true');

    localStorage.setItem('tm-roles', JSON.stringify(loginResponse.roles));
    localStorage.setItem('tm-designation', loginResponse.designation);
    localStorage.setItem('tm-userName', loginResponse.userName);
    localStorage.setItem('tm-providerServiceMapID', loginResponse.providerServiceMapID);
    localStorage.setItem('tm-userID', loginResponse.userID);
  }

  checkUserRolesAndDesignation(roles, designation) {
    if (roles && roles.includes(designation)) {
      return true;
    }
    return false;
  }

  getUserRoles(serviceData) {
    let roleArray = [];
    if (serviceData && serviceData.roles) {
      let rolesData = serviceData.roles;
      rolesData.forEach((role) => {
        if (role && role.serviceRoleScreenMappings) {
          role.serviceRoleScreenMappings.forEach((serviceRole) => {
            if (serviceRole && serviceRole.screen && serviceRole.screen.screenName)
              roleArray.push(serviceRole.screen.screenName)
          });
        }
      });
    }
    return roleArray;
  }

  getUserDesignation(loginDataResponse) {
    let designation;
    if (loginDataResponse.designation && loginDataResponse.designation.designationName) {
      designation = loginDataResponse.designation.designationName;
    }
    return designation;
  }

}
