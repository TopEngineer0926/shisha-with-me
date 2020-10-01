import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageSharePageRoutingModule } from './image-share-routing.module';

import { ImageSharePage } from './image-share.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageSharePageRoutingModule
  ],
  declarations: [ImageSharePage]
})
export class ImageSharePageModule {}
