import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEquipmentPageRoutingModule } from './add-equipment-routing.module';

import { AddEquipmentPage } from './add-equipment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEquipmentPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AddEquipmentPage],
})
export class AddEquipmentPageModule {}
