import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { PasswordRulesDirective } from './validators/password-rules.directive';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    FormsModule
  ],
  declarations: [RegisterComponent, LoginComponent, PasswordRulesDirective]
})
export class AuthModule {}
