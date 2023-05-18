import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { HttpServiceService } from '../../services/http-service.service';
import { SetLanguageComponent } from '../set-language.component';

@Component({
  selector: 'app-show-commit-and-version-details',
  templateUrl: './show-commit-and-version-details.component.html',
  styleUrls: ['./show-commit-and-version-details.component.css']
})
export class ShowCommitAndVersionDetailsComponent implements OnInit {

  currentLanguageSet:any;
  languageComponent: SetLanguageComponent;
  constructor(@Inject(MD_DIALOG_DATA) public input: any,
    public httpServiceService : HttpServiceService,
    public dialogRef: MdDialogRef<ShowCommitAndVersionDetailsComponent>) { }

  ngOnInit() {
    this.fetchLanguageResponse();
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
