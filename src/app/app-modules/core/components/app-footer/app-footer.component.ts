import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../services/http-service.service';
import { SetLanguageComponent } from '../set-language.component';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.css']
})
export class AppFooterComponent implements OnInit {

  languageComponent: SetLanguageComponent;
  status: boolean;
  // today: Date;
  constructor(
    public httpServiceService : HttpServiceService
  ) { }
  year:any;
  today:Date;
  currentLanguageSet:any;
  ngOnInit() {
    this.today = new Date();
    this.year = this.today.getFullYear();
    this.fetchLanguageResponse();
    console.log('inside footer',this.year);
    
      setInterval(() => {
        this.status = navigator.onLine;
      }, 1000);
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
