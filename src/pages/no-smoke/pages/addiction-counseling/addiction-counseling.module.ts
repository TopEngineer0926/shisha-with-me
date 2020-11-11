import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddictionCounselingPageRoutingModule } from './addiction-counseling-routing.module';

import { AddictionCounselingPage } from './addiction-counseling.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddictionCounselingPageRoutingModule
  ],
  declarations: [AddictionCounselingPage]
})
export class AddictionCounselingPageModule {}
