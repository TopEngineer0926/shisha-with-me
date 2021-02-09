import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdSavedPageRoutingModule } from './ad-saved-routing.module';

import { AdSavedPage } from './ad-saved.page';
import { AdItemComponent } from '../advertising/components/ad-item/ad-item.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AdSavedPageRoutingModule],
  declarations: [AdSavedPage, AdItemComponent],
})
export class AdSavedPageModule {}
