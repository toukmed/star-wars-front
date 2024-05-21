import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {GraphQLModule} from './graphql/graphql.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {SearchComponent} from './components/search/search.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatChipsModule} from "@angular/material/chips";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTabsModule} from "@angular/material/tabs";
import {HttpErrorsInterceptor} from "./interceptors/http-errors.interceptor";
import { DialogComponent } from './components/dialog/dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import { DetailsDialogComponent } from './components/details-dialog/details-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    DialogComponent,
    DetailsDialogComponent
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpErrorsInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
