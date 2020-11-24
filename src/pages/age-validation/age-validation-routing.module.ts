import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgeValidationPage } from './age-validation.page';

const routes: Routes = [
  {
    path: '',
    component: AgeValidationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgeValidationPageRoutingModule {}
