import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnBoardingPageRoutingModule } from './on-boarding-routing.module';

import { OnBoardingPage } from './on-boarding.page';
import { TranslateModule } from '@ngx-translate/core';
import { FriendsAddListComponentModule } from 'src/common/components/friends-add-list/friends-add-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnBoardingPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule,

    FriendsAddListComponentModule,
  ],
  declarations: [OnBoardingPage],
})
export class OnBoardingPageModule {}
