import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnBoardingPage } from './on-boarding.page';

const routes: Routes = [
  {
    path: '',
    component: OnBoardingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnBoardingPageRoutingModule {}
