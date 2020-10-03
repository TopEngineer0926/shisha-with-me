import { AfterViewInit, Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import {
  IonRouterOutlet,
  ModalController,
  PopoverController,
} from '@ionic/angular';
import { MapService } from 'src/common/services/map.service';
import { MapFilterComponent } from './components/map-filter/map-filter.component';
import { PlacePage } from './place/place.page';
const { Geolocation } = Plugins;

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

  constructor(
    public mapService: MapService,
    public popoverController: PopoverController,
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet
  ) {}

  ngAfterViewInit() {}

  mapReady(map) {
    this.map = map;
  }

  initAutocomplete() {
    const map = this.map;

    // Create the search box and link it to the UI element.
    const input = document.getElementById('pac-input') as HTMLInputElement;
    const searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', () => {
      searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
    });

    let markers: google.maps.Marker[] = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();

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

        // Create a marker for each place.
        markers.push(
          new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          })
        );

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }

  createMarker(place: google.maps.places.PlaceResult) {
    const marker = new google.maps.Marker({
      map: this.map,
      position: (place.geometry as google.maps.places.PlaceGeometry).location,
    });

    google.maps.event.addListener(marker, 'click', () => {
      this.infowindow.setContent(place.name);
      this.infowindow.open(this.map);
    });
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
      setTimeout(() => {
        this.locationLoading = false;
        this.loadPlaces();
      }, 1000);
    }
  }

  async openPlace(place) {
    const modal = await this.modalCtrl.create({
      component: PlacePage,
      cssClass: 'my-custom-class',
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

    console.log(request);

    const service = new google.maps.places.PlacesService(this.map);

    service.nearbySearch(request, (results, status) => {
      console.log(results, status);
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // tslint:disable-next-line: prefer-for-of
        for (var i = 0; i < results.length; i++) {
          this.createMarker(results[i]);
          console.log('shisha');
        }
        this.map.setCenter(results[0].geometry.location);
      }
    });
  }
}
