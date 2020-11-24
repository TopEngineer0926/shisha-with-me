import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgeValidationPageRoutingModule } from './age-validation-routing.module';

import { AgeValidationPage } from './age-validation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgeValidationPageRoutingModule
  ],
  declarations: [AgeValidationPage]
})
export class AgeValidationPageModule {}
