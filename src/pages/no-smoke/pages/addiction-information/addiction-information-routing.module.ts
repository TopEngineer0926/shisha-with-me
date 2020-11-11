import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddictionInformationPage } from './addiction-information.page';

const routes: Routes = [
  {
    path: '',
    component: AddictionInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddictionInformationPageRoutingModule {}
