import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FriendsAddListComponent } from './friends-add-list.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  declarations: [FriendsAddListComponent],
  exports: [FriendsAddListComponent],
})
export class FriendsAddListComponentModule {}
