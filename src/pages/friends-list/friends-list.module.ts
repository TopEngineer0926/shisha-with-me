import { ProfilePageModule } from 'src/pages/profile/profile.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FriendsListPageRoutingModule } from './friends-list-routing.module';

import { FriendsListPage } from './friends-list.page';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FriendsListPageRoutingModule,
    NgxQRCodeModule,
    ProfilePageModule,
  ],
  declarations: [FriendsListPage],
})
export class FriendsListPageModule {}
