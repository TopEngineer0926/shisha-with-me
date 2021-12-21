import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { ProfilePageModule } from 'src/pages/profile/profile.module';
import { FriendsListPageRoutingModule } from './friends-list-routing.module';
import { FriendsListPage } from './friends-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FriendsListPageRoutingModule,
    NgxQRCodeModule,
    ProfilePageModule,
  ],
  declarations: [],
})
export class FriendsListPageModule { }
