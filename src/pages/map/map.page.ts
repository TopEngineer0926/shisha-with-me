import { AfterViewInit, Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import {
  IonRouterOutlet,
  LoadingController,
  ModalController,
  PopoverController,
} from '@ionic/angular';
import { MapService } from 'src/common/services/map.service';
import { MapFilterComponent } from './components/map-filter/map-filter.component';
import { PlacePage } from './place/place.page';
const { Geolocation } = Plugins;

import MarkerClusterer from '@google/markerclusterer';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements AfterViewInit {
  locationLoading: boolean = false;
  lat = 51.178418;
  lng = 9.95;
  zoom = 6;

  markers = [];

  map: google.maps.Map;

  infowindow: google.maps.InfoWindow;
  options: google.maps.MapOptions = {
    center: { lat: 40, lng: -20 },
    zoom: 4,
  };

  constructor(
    public mapService: MapService,
    public popoverController: PopoverController,
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet,
    private loadingCtrl: LoadingController
  ) {}

  ngAfterViewInit() {}

  async mapReady(map) {
    this.map = map;
    const loading = await this.loadingCtrl.create({});
    loading.present();

    try {
      await this.getCurrentPosition();
      await this.loadPlaces();
    } catch (error) {
    } finally {
      loading.dismiss();
    }
  }

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
    return new Promise(async (resolve) => {
      this.locationLoading = true;
      try {
        const coordinates = await Geolocation.getCurrentPosition();

        this.lat = coordinates.coords.latitude;
        this.lng = coordinates.coords.longitude;
        this.markers.push({
          lat: coordinates.coords.latitude,
          lng: coordinates.coords.longitude,
        });
        this.zoom = 12;
      } catch (error) {
      } finally {
        this.locationLoading = false;
        resolve(true);
      }
    });
  }

  async openPlace(place) {
    const modal = await this.modalCtrl.create({
      component: PlacePage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        place,
      },
    });
    return await modal.present();
  }

  loadPlaces() {
    const request = {
      keyword: 'shisha bar',
      fields: ['name', 'geometry'],
      location: { lat: this.lat, lng: this.lng },
      radius: 50000,
    };

    const service = new google.maps.places.PlacesService(this.map);

    service.nearbySearch(request, (results, status) => {
      console.log(results, status);
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.addMarkersforPlaces(results);
      }
    });
  }

  addMarkersforPlaces(places: google.maps.places.PlaceResult[]) {
    let markers: google.maps.Marker[] = [];
    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();
    places.forEach((place) => {
      if (!place.geometry) {
        console.log('Returned place contains no geometry');
        return;
      }
      const icon = {
        url: place.icon as string,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      const marker = new google.maps.Marker({
        map: this.map,
        icon,
        title: place.name,
        position: place.geometry.location,
      });

      // Create a marker for each place.
      markers.push(marker);

      google.maps.event.addListener(marker, 'click', async () => {
        console.log(place.name, this.map);
        await this.openPlace(place);
      });

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    this.map.fitBounds(bounds);

    new MarkerClusterer(this.map, markers, {
      imagePath:
        'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
    });
  }
}
