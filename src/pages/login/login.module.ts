import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { AuthNewPasswordComponent } from './components/auth-new-password/auth-new-password.component';
import { AuthResetCodeComponent } from './components/auth-reset-code/auth-reset-code.component';
import { RegisterSuccessComponent } from './components/register/components/register-success/register-success.component';
import { RegisterComponent } from './components/register/register.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    TranslateModule,
  ],
  declarations: [
    LoginPage,
    RegisterComponent,
    RegisterSuccessComponent,
    AuthResetCodeComponent,
    AuthNewPasswordComponent,
  ],
})
export class LoginPageModule {}
