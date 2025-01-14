import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { HttpServiceService } from '../../services/http-service.service';
import { SetLanguageComponent } from '../set-language.component';

@Component({
  selector: 'app-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.css'],
})
export class CommonDialogComponent implements OnInit {
  @Output() cancelEvent = new EventEmitter();

  public title: string;
  public message: string;
  public status: string;
  public btnOkText?: string;
  public btnCancelText?: string;
  public alert: boolean;
  public confirmAlert: boolean;
  public remarks: boolean;
  public capture: boolean;
  public editRemarks: boolean;
  public comments: string;
  public notify: boolean;
  public mandatories: any;

  // Choose from Radio Button
  public choice: boolean;
  public values: any;
  public selectedValue: any;

  //Language Selection
  languageComponent: SetLanguageComponent;
  currentLanguageSet: any;

  // Choose from Radio Button Ends

  constructor(public dialogRef: MdDialogRef<CommonDialogComponent>,
    public httpServiceService: HttpServiceService) { }

  ngOnInit() {
    this.fetchLanguageResponse();
  }

  Confirm() {
    this.cancelEvent.emit(null);
  }

  sessionTimeout: any;
  minutes: number;
  seconds: number;
  timer: number;

  intervalRef: any;

  updateTimer(timer) {
    this.timer = timer;

    if (timer && timer > 0) {
      this.intervalRef = setInterval(() => {
        if (timer == 0) {
          clearInterval(this.intervalRef);
          this.dialogRef.close({ action: 'timeout'});
        } else {
          this.minutes = timer / 60;
          this.seconds = timer % 60;
          timer--;
          this.timer = timer;
        }
      }, 1000);
    }
  }

  stopTimer() {
    clearInterval(this.intervalRef);
    this.dialogRef.close({action: 'cancel', remainingTime: this.timer});
  }

  continueSession() {
    clearInterval(this.intervalRef);
    this.dialogRef.close({action: 'continue'});
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
