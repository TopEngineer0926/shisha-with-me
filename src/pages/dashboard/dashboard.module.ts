import { GoogleMapsModule } from '@angular/google-maps';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { SwiperModule } from 'ngx-swiper-wrapper';

@NgModule({
  imports: [
    GoogleMapsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    SwiperModule,
  ],
  declarations: [DashboardPage],
})
export class DashboardPageModule {}
