import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FriendsListPageRoutingModule } from './friends-list-routing.module';

import { FriendsListPage } from './friends-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FriendsListPageRoutingModule
  ],
  declarations: [FriendsListPage]
})
export class FriendsListPageModule {}
