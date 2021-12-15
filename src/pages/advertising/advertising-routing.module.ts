import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdvertisingPage } from "./advertising.page";
import { AdPageModule } from "./pages/ad/ad.module";

const routes: Routes = [
  {
    path: "",
    component: AdvertisingPage,
  },
  {
    path: ":id",
    loadChildren: () => AdPageModule,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvertisingPageRoutingModule {}
