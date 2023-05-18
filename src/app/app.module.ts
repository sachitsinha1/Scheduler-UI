import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RedirOpenComponent } from './redir-open/redir-open.component';

// Import custom route module....
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './app-modules/core/core.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, RedirOpenComponent],
  imports: [BrowserModule,HttpClientModule, BrowserAnimationsModule, AppRoutingModule, CoreModule.forRoot()],
  bootstrap: [AppComponent]
})
export class AppModule { }
