import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewusersComponent } from './components/viewusers/viewusers.component';
import { StudentLoginComponent } from './components/studentLogin/studentLogin.component';
import { StudentPage1Component } from './components/studentPage1/studentPage1.component';
import { StudentAuthGuard } from './student-auth.guard';


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
    path: 'student/page/1', 
    component: StudentPage1Component,
    //canActivate: [StudentAuthGuard]
  },
  { 
    path: 'admin/students/view', 
    component: ViewusersComponent 
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
