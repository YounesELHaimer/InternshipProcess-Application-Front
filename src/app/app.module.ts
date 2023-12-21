import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { ViewusersComponent } from './components/viewusers/viewusers.component';
import { StudentLoginComponent } from './components/studentLogin/studentLogin.component';
import { StudentPage1Component } from './components/studentPage1/studentPage1.component';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FirstYearStudentComponent } from './components/first-year-student/first-year-student.component';
import { SecondYearStudentComponent } from './components/second-year-student/second-year-student.component';
import { ThirdYearStudentComponent } from './components/third-year-student/third-year-student.component';


@NgModule({
  declarations: [
    AppComponent,
    ViewusersComponent,
    StudentLoginComponent,
    StudentPage1Component,
    FirstYearStudentComponent,
    SecondYearStudentComponent,
    ThirdYearStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
