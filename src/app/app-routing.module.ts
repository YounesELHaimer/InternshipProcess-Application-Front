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
    canActivate: [StudentAuthGuard]
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
    canActivate: [AdminAuthGuard]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
