import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapPageRoutingModule } from './map-routing.module';

import { MapPage } from './map.page';
import { AgmCoreModule } from '@agm/core';
import { MapFilterComponent } from './components/map-filter/map-filter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapPageRoutingModule,
    AgmCoreModule,
  ],
  declarations: [MapPage, MapFilterComponent],
})
export class MapPageModule {}
