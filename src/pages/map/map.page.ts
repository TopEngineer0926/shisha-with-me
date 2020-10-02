import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { PopoverController } from '@ionic/angular';
import { MapService } from 'src/common/services/map.service';
import { MapFilterComponent } from './components/map-filter/map-filter.component';
const { Geolocation } = Plugins;
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  locationLoading: boolean = false;
  lat = 51.178418;
  lng = 9.95;
  zoom = 6;

  markers = [];

  constructor(
    public mapService: MapService,
    public popoverController: PopoverController
  ) {}

  ngOnInit() {}

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: MapFilterComponent,
      cssClass: 'my-custom-class',
      event: ev,
      animated: true,
      translucent: true,
    });
    return await popover.present();
  }

  async getCurrentPosition() {
    this.locationLoading = true;
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log('Current', coordinates);
      this.lat = coordinates.coords.latitude;
      this.lng = coordinates.coords.longitude;
      this.markers.push({
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude,
      });
      this.zoom = 12;
    } catch (error) {
    } finally {
      setTimeout(() => {
        this.locationLoading = false;
      }, 1000);
    }
  }
}
