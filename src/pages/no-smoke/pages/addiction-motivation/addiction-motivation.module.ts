import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddictionMotivationPageRoutingModule } from './addiction-motivation-routing.module';

import { AddictionMotivationPage } from './addiction-motivation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddictionMotivationPageRoutingModule
  ],
  declarations: [AddictionMotivationPage]
})
export class AddictionMotivationPageModule {}
