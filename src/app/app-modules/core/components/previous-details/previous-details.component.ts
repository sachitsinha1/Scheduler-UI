import { Component, OnInit, Input, Inject } from '@angular/core';

import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { HttpServiceService } from '../../services/http-service.service';
import { SetLanguageComponent } from '../set-language.component';

@Component({
  selector: 'app-previous-details',
  templateUrl: './previous-details.component.html',
  styleUrls: ['./previous-details.component.css']
})
export class PreviousDetailsComponent implements OnInit {

  dataList = [];
  filteredDataList = [];
  columnList = [];
  currentLanguageSet:any;
  languageComponent: SetLanguageComponent;

  constructor(
    public dialogRef: MdDialogRef<PreviousDetailsComponent>,
    public httpServiceService:HttpServiceService,
    @Inject(MD_DIALOG_DATA) public input: any) { }

  ngOnInit() {
    this.fetchLanguageResponse();
    if (this.input.dataList.data instanceof Array){
      this.dataList = this.input.dataList.data;
      this.filteredDataList = this.dataList.slice();
    }
    if (this.input.dataList.columns instanceof Array)
      this.columnList = this.input.dataList.columns;
  }

  filterPreviousData(searchTerm) {
    console.log("searchTerm", searchTerm);
    if (!searchTerm)
      this.filteredDataList = this.dataList;
    else {
      this.filteredDataList = [];
      this.dataList.forEach((item) => {
        for (let key in item) {
          let value: string = '' + item[key];
          if (value.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) {
            this.filteredDataList.push(item); break;
          }
        }
      });
    }
  }

  closeDialog() {
    this.dialogRef.close();
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
