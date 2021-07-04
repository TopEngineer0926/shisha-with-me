import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewsPageRoutingModule } from './reviews-routing.module';

import { ReviewsPage } from './reviews.page';
import { NgxStarsModule } from 'ngx-stars';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewsPageRoutingModule,
    NgxStarsModule,
  ],
  declarations: [ReviewsPage],
})
export class ReviewsPageModule {}
