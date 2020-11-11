import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddictionCounselingPage } from './addiction-counseling.page';

const routes: Routes = [
  {
    path: '',
    component: AddictionCounselingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddictionCounselingPageRoutingModule {}
