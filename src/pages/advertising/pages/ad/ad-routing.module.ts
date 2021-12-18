import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdSavedPage } from 'src/pages/ad-saved/ad-saved.page';

import { AdPage } from './ad.page';

const routes: Routes = [
  {
    path: '',
    component: AdPage
  },
  {
    path: 'wishlist',
    component: AdSavedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdPageRoutingModule { }
