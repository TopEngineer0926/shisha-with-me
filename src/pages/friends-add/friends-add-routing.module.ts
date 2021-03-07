import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FriendsAddPage } from './friends-add.page';

const routes: Routes = [
  {
    path: '',
    component: FriendsAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FriendsAddPageRoutingModule {}
