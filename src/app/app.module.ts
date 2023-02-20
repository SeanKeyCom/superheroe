import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NgModule, Directive } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuperheroeSearchComponent } from './modules/superheroe-search/superheroe-search.component';
import { SuperheroeManagementComponent } from './modules/superheroe-management/superheroe-management.component';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteDialogComponent } from './shared/components/dialog-modal/delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ToUpperCaseDirective } from './shared/directives/to-upper-case.directive';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { ToUpperCaseKeyupDirective } from './shared/directives/to-upper-case-keyup.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FilterComponent } from './modules/superheroe-search/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    SuperheroeSearchComponent,
    SuperheroeManagementComponent,
    DeleteDialogComponent,
    ToUpperCaseDirective,
    ToUpperCaseKeyupDirective,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
