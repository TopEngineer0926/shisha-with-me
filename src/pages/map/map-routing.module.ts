import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FriendsAddPageModule } from '../friends-add/friends-add.module';

import { MapPage } from './map.page';

const routes: Routes = [
  {
    path: '',
    component: MapPage
  },
  {
    path: 'friends-add',
    loadChildren: () => FriendsAddPageModule
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapPageRoutingModule { }
