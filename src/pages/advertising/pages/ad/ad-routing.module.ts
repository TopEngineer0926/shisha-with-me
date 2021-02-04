import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdPage } from './ad.page';

const routes: Routes = [
  {
    path: '',
    component: AdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdPageRoutingModule {}
