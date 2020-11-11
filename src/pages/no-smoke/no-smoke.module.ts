import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoSmokePageRoutingModule } from './no-smoke-routing.module';

import { NoSmokePage } from './no-smoke.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoSmokePageRoutingModule
  ],
  declarations: [NoSmokePage]
})
export class NoSmokePageModule {}
