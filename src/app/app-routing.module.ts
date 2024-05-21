import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchComponent} from './components/search/search.component';
import {RouterModule} from '@angular/router';

const routes = [{
  path: '', children: [
    {path: '', redirectTo: '/search', pathMatch: 'full'},
    {path: 'search', component: SearchComponent}
  ]
}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
