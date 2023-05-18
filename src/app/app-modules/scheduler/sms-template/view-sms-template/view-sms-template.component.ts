import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from '../../../core/services/confirmation.service';
import { SchedulerService } from '../../shared/services';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SetLanguageComponent } from '../../../core/components/set-language.component';
import { HttpServiceService } from 'app/app-modules/core/services/http-service.service';
@Component({
  selector: 'app-view-sms-template',
  templateUrl: './view-sms-template.component.html',
  styleUrls: ['./view-sms-template.component.css']
})
export class ViewSmsTemplateComponent implements OnInit {

  languageComponent : SetLanguageComponent;
  currentLanguageSet: any;

  constructor(private schedulerService: SchedulerService,
    public httpServiceService: HttpServiceService,
    private confirmationService: ConfirmationService, private activatedRoute: ActivatedRoute,private location:Location) { }
  fullSMSTemplate: any;
  ngOnInit() {
    this.getFullSMSTemplate();
    // this.httpServiceService.currentLangugae$.subscribe(response =>this.currentLanguageSet = response);
    // this.languageComponent.setLanguage();
  }

  getFullSMSTemplate() {
    let reqObj = {
      'providerServiceMapID': this.activatedRoute.snapshot.params['provider'],
      'smsTemplateID': this.activatedRoute.snapshot.params['smsTemplateID']
    }
    this.schedulerService.getFullSMSTemplate(reqObj).subscribe((res) => {
      console.log('res', res);
      if (res && res.statusCode == 200) {
        this.fullSMSTemplate = res.data;
      } else {
        this.confirmationService.alert(res.errorMessage, 'error');
        this.location.back();
      }
    }, err => {
      this.confirmationService.alert(err, 'error');
      this.location.back();
    });
  }

  ngDoCheck(){
    this.fetchLanguageResponse();
  }

  fetchLanguageResponse() {
    this.languageComponent = new SetLanguageComponent(this.httpServiceService);
    this.languageComponent.setLanguage();
    this.currentLanguageSet = this.languageComponent.currentLanguageObject; 
  }

}
