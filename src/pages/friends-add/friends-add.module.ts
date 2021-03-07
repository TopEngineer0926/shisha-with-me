import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FriendsAddPageRoutingModule } from './friends-add-routing.module';

import { FriendsAddPage } from './friends-add.page';
import { FriendsAddListComponentModule } from 'src/common/components/friends-add-list/friends-add-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FriendsAddPageRoutingModule,

    FriendsAddListComponentModule,
  ],
  declarations: [FriendsAddPage],
})
export class FriendsAddPageModule {}
