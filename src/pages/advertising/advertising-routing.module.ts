import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdSavedPageRoutingModule } from "../ad-saved/ad-saved-routing.module";
import { AdSavedPageModule } from "../ad-saved/ad-saved.module";
import { AdSavedPage } from "../ad-saved/ad-saved.page";

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
  {
    path: 'wishlist',
    loadChildren: () => AdSavedPageModule
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvertisingPageRoutingModule { }
