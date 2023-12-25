import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewusersComponent } from './components/viewusers/viewusers.component';
import { StudentLoginComponent } from './components/studentLogin/studentLogin.component';
import { AdminLoginComponent } from './components/adminLogin/adminLogin.component';
import { StudentPage1Component } from './components/studentPage1/studentPage1.component';
import { StudentAuthGuard } from './student-auth.guard';
import { AdminAuthGuard } from './admin-auth.guard';
import { FirstYearStudentComponent } from './components/first-year-student/first-year-student.component';
import { SecondYearStudentComponent } from './components/second-year-student/second-year-student.component';
import { ThirdYearStudentComponent } from './components/third-year-student/third-year-student.component';
import { PfeStudentsComponent } from './components/pfe-students/pfe-students.component';
import { PfaStudentsComponent } from './components/pfa-students/pfa-students.component';
import { InitiationStudentsComponent } from './components/initiation-students/initiation-students.component';
import { AjouterStagePFEComponent } from './components/ajouterStagePFE/ajouterStagePFE.component';
import { AjouterStagePFAComponent } from './components/ajouter-stage-pfa/ajouter-stage-pfa.component';
import { AjouterStageComponent } from './components/ajouter-stage/ajouter-stage.component';
import { CountdownComponent } from './components/countdown/countdown.component';

import { EncadrantComponent } from './components/encadrant/encadrant.component';
import { JuryComponent } from './components/jury/jury.component';
import { AnalytiqueComponent } from './components/analytique/analytique.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { CustomChartComponent } from './components/custom-chart/custom-chart.component';


const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/login',
    pathMatch: 'full' 
  },
  { 
    path: 'login', 
    component: StudentLoginComponent 
  },
  { 
    path: 'login/chef/de/filiere/admin', 
    component: AdminLoginComponent 
  },
  { 
    path: 'student/page/1/:etudiantId', 
    component: StudentPage1Component,
    //canActivate: [StudentAuthGuard]
  },
  { 
    path: 'admin/FirstYearStudents/view/:filiereId', 
    component: FirstYearStudentComponent,
   
  },
  { 
    path: 'admin/SecondYearStudents/view/:filiereId', 
    component: SecondYearStudentComponent,
   
  },
  { 
    path: 'admin/ThirdYearStudents/view/:filiereId', 
    component: ThirdYearStudentComponent,

  },
  {
    path: 'admin/students/view/:filiereId',
    component: ViewusersComponent,
    //canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/PfeStudents/view/:filiereId',
    component: PfeStudentsComponent,
  },
  {
    path: 'admin/PfaStudents/view/:filiereId',
    component: PfaStudentsComponent,
  },
  {
    path: 'admin/InitiationStudents/view/:filiereId',
    component: InitiationStudentsComponent,
  },
  { 
    path: 'student/AddStage/PFE/:etudiantId', 
    component: AjouterStagePFEComponent,
    canActivate: [StudentAuthGuard]
  },
  { 
    path: 'student/AddStage/PFA/:etudiantId', 
    component: AjouterStagePFAComponent,
    canActivate: [StudentAuthGuard]
  },
  { 
    path: 'student/AddStage/:etudiantId', 
    component: AjouterStageComponent,
    canActivate: [StudentAuthGuard]
  },
  { 
    path: 'student/countdown/:etudiantId', 
    component: CountdownComponent,
    canActivate: [StudentAuthGuard]
  },
  
  {
    path: 'admin/encadrant/view/:filiereId',
    component: EncadrantComponent,
  },
  {
    path: 'admin/jury/view/:filiereId',
    component: JuryComponent,
  },
  {
    path: 'admin/analytique/view/:filiereId',
    component: AnalytiqueComponent,
  },
  {
    path: 'admin/pie-chart/view/:filiereId',
    component: PieChartComponent,
  },
  {
    path: 'admin/custom-chart/view/:filiereId',
    component: CustomChartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
