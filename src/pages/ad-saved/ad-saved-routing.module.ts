import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdSavedPage } from './ad-saved.page';

const routes: Routes = [
  {
    path: '',
    component: AdSavedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdSavedPageRoutingModule {}
