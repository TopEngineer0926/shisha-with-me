import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdSavedPageModule } from '../ad-saved/ad-saved.module';
import { AdvertisingPageRoutingModule } from './advertising-routing.module';
import { AdvertisingPage } from './advertising.page';
import { AdItemModule } from './components/ad-item/ad-item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdvertisingPageRoutingModule,
    AdItemModule,
    AdSavedPageModule
  ],
  declarations: [AdvertisingPage],
})
export class AdvertisingPageModule {}
