import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { WelcomeComponent } from './common/welcome/welcome.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { AuthModule } from './auth/auth.module';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from './auth/services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NotFoundComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
