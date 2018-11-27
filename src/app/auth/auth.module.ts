import {NgModule} from '@angular/core';
import { RegisterComponent } from './register/register.component';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  declarations: [RegisterComponent]
})
export class AuthModule {}
