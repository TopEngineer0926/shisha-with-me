import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEquipmentPage } from './add-equipment.page';

const routes: Routes = [
  {
    path: '',
    component: AddEquipmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEquipmentPageRoutingModule {}
