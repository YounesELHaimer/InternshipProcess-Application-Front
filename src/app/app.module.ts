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
import { StageDetailsComponent } from './components/viewusers/StageDetailsComponent';
import { MatDialogModule } from '@angular/material/dialog';
import { AnalytiqueComponent } from './components/analytique/analytique.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartModule } from 'angular-highcharts';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { StackedBarChartComponent } from './components/stacked-bar-chart/stacked-bar-chart.component';
import { CustomChartComponent } from './components/custom-chart/custom-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';


import { AfficherJurysComponent } from './components/afficher-jurys/afficher-jurys.component';
import { ModifierStageComponent } from './components/modifier-stage/modifier-stage.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { AfficherEncadrantComponent } from './components/afficher-encadrant/afficher-encadrant.component';

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
    JuryComponent,
    StageDetailsComponent,
    AnalytiqueComponent,
    PieChartComponent,
    StackedBarChartComponent,
    CustomChartComponent,
    AfficherJurysComponent,
    ModifierStageComponent,
    AfficherEncadrantComponent,
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
    FormsModule,
    MatDialogModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    FontAwesomeModule,
    ChartModule,
    NgxChartsModule,
    
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
