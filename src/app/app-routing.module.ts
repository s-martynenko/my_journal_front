import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './common/welcome/welcome.component';
import {NotFoundComponent} from './common/not-found/not-found.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
