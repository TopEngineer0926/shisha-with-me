import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileEditPageRoutingModule } from './profile-edit-routing.module';

import { ProfileEditPage } from './profile-edit.page';
import { AddEquipmentPageModule } from './pages/add-equipment/add-equipment.module';
import { LocationSelectComponent } from './pages/location-select/location-select.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileEditPageRoutingModule,
    AddEquipmentPageModule,
  ],
  declarations: [ProfileEditPage, LocationSelectComponent, EditProfileComponent],
})
export class ProfileEditPageModule { }
