import { NgModule } from '@angular/core';
import { MdToolbarModule } from '@angular/material';
import { MdIconModule } from '@angular/material';
import { MatStepperModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule, MatTooltipModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material';
import { MatButtonToggleModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MD_ERROR_GLOBAL_OPTIONS, showOnDirtyErrorStateMatcher } from '@angular/material';
import { MatSelectModule, MatSidenavModule } from '@angular/material';
import { MatProgressSpinnerModule, MatCheckboxModule } from '@angular/material';
import { MatDialogModule, MatMenuModule, MdDatepickerModule } from '@angular/material';
import { MatDatepickerModule, MdNativeDateModule, MAT_DATE_LOCALE } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { NativeDateAdapter, DateAdapter, MD_DATE_FORMATS } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  imports: [
    MdIconModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MdNativeDateModule,
    MatDatepickerModule,
    MatChipsModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatMenuModule,
    MdDatepickerModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatInputModule,
    MdToolbarModule,
    MatRadioModule,
    MatStepperModule,
    MdButtonModule,
    MatExpansionModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatListModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  exports: [
    MdIconModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MdNativeDateModule,
    MatDatepickerModule,
    MatChipsModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatMenuModule,
    MdDatepickerModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatInputModule,
    MdToolbarModule,
    MatRadioModule,
    MatStepperModule,
    MdButtonModule,
    MatExpansionModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatListModule
  ]
})
export class MaterialModule { }

