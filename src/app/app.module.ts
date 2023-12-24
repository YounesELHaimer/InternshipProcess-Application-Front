import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { ViewusersComponent } from './components/viewusers/viewusers.component';
import { StudentLoginComponent } from './components/studentLogin/studentLogin.component';
import { AdminLoginComponent } from './components/adminLogin/adminLogin.component';
import { StudentPage1Component } from './components/studentPage1/studentPage1.component';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort'

import { FirstYearStudentComponent } from './components/first-year-student/first-year-student.component';
import { SecondYearStudentComponent } from './components/second-year-student/second-year-student.component';
import { ThirdYearStudentComponent } from './components/third-year-student/third-year-student.component';
import { PfeStudentsComponent } from './components/pfe-students/pfe-students.component';
import { PfaStudentsComponent } from './components/pfa-students/pfa-students.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { AjouterStagePFEComponent } from './components/ajouterStagePFE/ajouterStagePFE.component';
import { InitiationStudentsComponent } from './components/initiation-students/initiation-students.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AjouterStagePFAComponent } from './components/ajouter-stage-pfa/ajouter-stage-pfa.component';
import { AjouterStageComponent } from './components/ajouter-stage/ajouter-stage.component';



import { FormsModule } from '@angular/forms';
import { EncadrantComponent } from './components/encadrant/encadrant.component';
import { JuryComponent } from './components/jury/jury.component';


@NgModule({
  declarations: [
    AppComponent,
    ViewusersComponent,
    AdminLoginComponent,
    StudentLoginComponent,
    StudentPage1Component,
    FirstYearStudentComponent,
    SecondYearStudentComponent,
    ThirdYearStudentComponent,
    PfeStudentsComponent,
    PfaStudentsComponent,
    InitiationStudentsComponent,
    AjouterStagePFEComponent,
    CountdownComponent,
    AjouterStagePFAComponent,
    AjouterStageComponent,
    EncadrantComponent,
    JuryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
