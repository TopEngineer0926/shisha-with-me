import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdvertisingPageRoutingModule } from './advertising-routing.module';

import { AdvertisingPage } from './advertising.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdvertisingPageRoutingModule
  ],
  declarations: [AdvertisingPage]
})
export class AdvertisingPageModule {}
