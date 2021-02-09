import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdvertisingPageRoutingModule } from './advertising-routing.module';

import { AdvertisingPage } from './advertising.page';
import { AdItemComponent } from './components/ad-item/ad-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdvertisingPageRoutingModule,
  ],
  declarations: [AdvertisingPage, AdItemComponent],
})
export class AdvertisingPageModule {}
