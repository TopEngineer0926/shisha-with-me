import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageSharePage } from './image-share.page';

const routes: Routes = [
  {
    path: '',
    component: ImageSharePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageSharePageRoutingModule {}
