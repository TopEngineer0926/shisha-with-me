import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapPageRoutingModule } from './map-routing.module';

import { MapPage } from './map.page';
import { MapFilterComponent } from './components/map-filter/map-filter.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  imports: [
    GoogleMapsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MapPageRoutingModule,
  ],
  declarations: [MapPage, MapFilterComponent],
  exports: [MapPage],
})
export class MapPageModule {}
