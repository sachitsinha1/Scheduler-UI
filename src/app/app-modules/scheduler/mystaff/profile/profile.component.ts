import { Component, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { SchedulerService } from '../../shared/services';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MdTabChangeEvent } from '@angular/material';
import { HttpServiceService } from 'app/app-modules/core/services/http-service.service';
import { SetLanguageComponent } from 'app/app-modules/core/components/set-language.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnChanges {

  specialistData: any;
  currentLanguageSet: any;
  languageComponent: SetLanguageComponent;

  constructor(private schedulerService: SchedulerService,
    private activatedRoute: ActivatedRoute,
    public httpServiceService: HttpServiceService,
    private location: Location) { }

  ngOnInit() {
    this.initializeprofile();
    this.fetchLanguageResponse();
  }

  initializeprofile(){
    let userID = this.activatedRoute.snapshot.params['userID'];
    this.getSpecialistData(userID);
  }

  ngOnChanges() {
    console.log('checkonchange');

  }
  checkOnClick() {
    console.log('checkonchangeclick');
  }
  getSpecialistData(userID: any) {
    this.schedulerService.getSpecialistByUserID(userID).subscribe((response) => {
      if (response.statusCode == 200) {
        this.specialistData = response.data;
        console.log('Specialist Data..', this.specialistData);
      }
    });
  }

  backToStaffPage() {
    this.location.back();
  }

  getChangedTab:Boolean;
  public tabChanged(tabChangeEvent: MdTabChangeEvent): void {
    console.log('changedtab',tabChangeEvent.index);
    if(tabChangeEvent.index == 0)
    this.getChangedTab = true
    else
    this.getChangedTab = false
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
