import { SuperheroeSearchComponent } from './modules/superheroe-search/superheroe-search.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperheroeManagementComponent } from './modules/superheroe-management/superheroe-management.component';

const routes: Routes = [
  { path: 'home', component: SuperheroeSearchComponent },
  { path: 'management', component: SuperheroeManagementComponent },
  { path: 'management/:id', component: SuperheroeManagementComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: SuperheroeSearchComponent }
  //{ path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
