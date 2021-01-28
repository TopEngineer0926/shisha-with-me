import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnBoardingPageRoutingModule } from './on-boarding-routing.module';

import { OnBoardingPage } from './on-boarding.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnBoardingPageRoutingModule
  ],
  declarations: [OnBoardingPage]
})
export class OnBoardingPageModule {}
