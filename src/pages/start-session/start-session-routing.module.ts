import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartSessionPage } from './start-session.page';

const routes: Routes = [
  {
    path: '',
    component: StartSessionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartSessionPageRoutingModule {}
