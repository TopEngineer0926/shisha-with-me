import { MapPageModule } from 'src/pages/map/map.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { SwiperModule } from 'swiper/angular';
import { StartSessionPageModule } from '../start-session/start-session.module';
import { StartSessionModalComponent } from './components/start-session-modal/start-session-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    SwiperModule,
    GoogleMapsModule,
  ],
  declarations: [DashboardPage, StartSessionModalComponent],
  exports: [IonicModule]
})
export class DashboardPageModule {}
