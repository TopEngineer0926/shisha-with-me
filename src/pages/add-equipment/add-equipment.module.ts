import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEquipmentPageRoutingModule } from './add-equipment-routing.module';

import { AddEquipmentPage } from './add-equipment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEquipmentPageRoutingModule
  ],
  declarations: [AddEquipmentPage]
})
export class AddEquipmentPageModule {}
