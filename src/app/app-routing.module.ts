import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewusersComponent } from './components/viewusers/viewusers.component';


const routes: Routes = [
  { path: '', component: ViewusersComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
