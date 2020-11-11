import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoSmokePage } from './no-smoke.page';

const routes: Routes = [
  {
    path: '',
    component: NoSmokePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoSmokePageRoutingModule {}
