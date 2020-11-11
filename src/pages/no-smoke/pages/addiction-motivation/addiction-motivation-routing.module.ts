import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddictionMotivationPage } from './addiction-motivation.page';

const routes: Routes = [
  {
    path: '',
    component: AddictionMotivationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddictionMotivationPageRoutingModule {}
