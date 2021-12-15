import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { GoogleMapsModule } from "@angular/google-maps";
import { IonicModule } from "@ionic/angular";
import { MapFilterComponent } from "./components/map-filter/map-filter.component";
import { MapPageRoutingModule } from "./map-routing.module";
import { MapPage } from "./map.page";
import { ReactiveFormsModule } from "@angular/forms";
import { FriendsListPageModule } from "../friends-list/friends-list.module";
import { FriendsListPage } from "../friends-list/friends-list.page";
@NgModule({
  imports: [GoogleMapsModule, CommonModule, FormsModule, IonicModule, MapPageRoutingModule, ReactiveFormsModule],
  declarations: [MapPage, MapFilterComponent, FriendsListPage],
  exports: [MapPage],
})
export class MapPageModule {}
