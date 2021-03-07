import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdItemModule } from '../advertising/components/ad-item/ad-item.module';
import { AdSavedPageRoutingModule } from './ad-saved-routing.module';
import { AdSavedPage } from './ad-saved.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdSavedPageRoutingModule,
    AdItemModule,
  ],
  declarations: [AdSavedPage],
})
export class AdSavedPageModule {}
