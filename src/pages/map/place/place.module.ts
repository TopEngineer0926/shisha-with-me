import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlacePageRoutingModule } from './place-routing.module';

import { PlacePage } from './place.page';
import { NgxStarsModule } from 'ngx-stars';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxStarsModule,
    PlacePageRoutingModule,
  ],
  declarations: [PlacePage],
})
export class PlacePageModule {}
