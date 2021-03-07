import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FriendsAddPageRoutingModule } from './friends-add-routing.module';

import { FriendsAddPage } from './friends-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FriendsAddPageRoutingModule
  ],
  declarations: [FriendsAddPage]
})
export class FriendsAddPageModule {}
