import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvertisingPage } from './advertising.page';

const routes: Routes = [
  {
    path: '',
    component: AdvertisingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvertisingPageRoutingModule {}
