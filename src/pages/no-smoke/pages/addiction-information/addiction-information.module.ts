import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddictionInformationPageRoutingModule } from './addiction-information-routing.module';

import { AddictionInformationPage } from './addiction-information.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddictionInformationPageRoutingModule
  ],
  declarations: [AddictionInformationPage]
})
export class AddictionInformationPageModule {}
