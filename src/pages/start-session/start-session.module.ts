import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartSessionPageRoutingModule } from './start-session-routing.module';

import { StartSessionPage } from './start-session.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartSessionPageRoutingModule
  ],
  declarations: [StartSessionPage]
})
export class StartSessionPageModule {}
