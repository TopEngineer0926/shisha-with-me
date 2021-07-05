import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import {
  IonRouterOutlet,
  LoadingController,
  ModalController,
  PopoverController,
} from '@ionic/angular';
import { MapService } from 'src/common/services/map.service';
import { MapFilterComponent } from './components/map-filter/map-filter.component';
import { PlacePage } from './place/place.page';
import { Geolocation } from '@capacitor/geolocation';
import { AuthService } from 'src/common/auth/_services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ProfilePage } from '../profile/profile.page';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements AfterViewInit {
  @ViewChild(GoogleMap) map: GoogleMap;
  locationLoading: boolean = false;
  infowindow: google.maps.InfoWindow;
  options: google.maps.MapOptions = {
    disableDefaultUI: true,
    styles: this.mapService.getStyles(),
  };
  center: google.maps.LatLngLiteral = { lat: 51.178418, lng: 9.95 };
  zoom = 6;
  // markerOptions: google.maps.MarkerOptions = { draggable: false, icon: };
  markerPositions: google.maps.LatLngLiteral[] = [];

  users;
  locations;

  constructor(
    public mapService: MapService,
    public popoverController: PopoverController,
    private modalCtrl: ModalController,
    //private routerOutlet: IonRouterOutlet,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    const locationMarker = [];

    const users: any = await this.http.get('api/users').toPromise();
    console.log('data', users);
    this.users = users;
    users.map((location) => {
      if (location.location) {
        locationMarker.push({
          lat: location.location.lat,
          lng: location.location.lng,
          id: location.id,
          type: 'user',
        });
      }
    });

    const locations: any = await this.http.get('api/locations').toPromise();
    console.log('locations', locations);
    this.locations = locations;

    locations.map((location) => {
      if (location.location) {
        locationMarker.push({
          lat: location.location.lat,
          lng: location.location.lng,
          id: location.id,
          type: 'location',
        });
      }
    });
    this.addMarkersForPlaces(locationMarker);
  }

  ngAfterViewInit() {
    this.mapReady();
  }

  loadMarker() {}

  close() {
    this.modalCtrl.dismiss();
  }

  async mapReady() {
    const loading = await this.loadingCtrl.create();
    loading.present();

    try {
      google.maps.event.addListener(this.map.googleMap, 'dragend', async () => {
        // await this.loadPlaces(true);
      });

      // await this.getCurrentPosition();
      // await this.loadPlaces();
    } catch (error) {
    } finally {
      loading.dismiss();
    }
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: MapFilterComponent,
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
        const coordinates = await Geolocation.getCurrentPosition({
          enableHighAccuracy: false,
          timeout: 1000,
        });
        this.center = {
          lat: coordinates.coords.latitude,
          lng: coordinates.coords.longitude,
        };

        this.markerPositions = [
          {
            lat: coordinates.coords.latitude,
            lng: coordinates.coords.longitude,
          },
        ];

        this.zoom = 14;

        const location = {
          lat: this.options.center.lat,
          lng: this.options.center.lng,
        };
        await this.http
          .put('api/users/' + this.authService.user.id, { location: location })
          .toPromise();
      } catch (error) {
      } finally {
        this.locationLoading = false;
        resolve(true);
      }
    });
  }

  async openPlace(id) {
    const elm = await this.modalCtrl.getTop();
    const modal = await this.modalCtrl.create({
      component: PlacePage,
      swipeToClose: true,
      presentingElement: elm, //this.routerOutlet.nativeEl,
      componentProps: {
        placeId: id,
      },
    });
    return await modal.present();
  }

  loadPlaces(doBounds = false) {
    console.log('loadPlaces', this.options, this.map);

    const request: any = {
      keyword: 'shisha',
      fields: ['name', 'geometry'],
      location: this.map.googleMap.getCenter(), //{ lat: this.center.lat, lng: this.center.lng },
      radius: 50000,
    };

    const service = new google.maps.places.PlacesService(this.map.googleMap);
    service.nearbySearch(request, (results, status) => {
      console.log('service');
      console.log(results, status);
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.addMarkersForPlaces(results, doBounds);
      }
    });
  }

  addMarkersForPlaces(places: any[], doBounds = false) {
    let markers: google.maps.Marker[] = [];
    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach((marker) => {
      marker?.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();
    places.forEach((place) => {
      console.log('place', place);

      let marker: any = new google.maps.Marker({
        map: this.map.googleMap,
        icon: {
          url:
            place.type == 'location'
              ? '/assets/icons/pint-outline.svg'
              : '/assets/icons/person-circle-outline.svg',
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        },
        position: { lat: place.lat, lng: place.lng },
      });

      marker.dataId = place.id;
      marker.dataType = place.type;

      markers.push(marker);

      google.maps.event.addListener(marker, 'click', async () => {
        console.log(marker);
        if (marker.dataType == 'location') {
          await this.openPlace(marker.dataId);
        }
        if (marker.dataType == 'user') {
          await this.openFriend(marker.dataId);
        }
      });

      /*if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }*/
      bounds.extend(place);
    });
    if (!doBounds) {
      this.map.googleMap.fitBounds(bounds);
    }
    /*new MarkerClusterer(this.map, markers, {
      imagePath:
        'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
    });*/
  }
  async openFriend(id) {
    const elm = await this.modalCtrl.getTop();
    const modal = await this.modalCtrl.create({
      component: ProfilePage,

      swipeToClose: true,
      presentingElement: elm,
      componentProps: {
        id: id,
      },
    });
    return await modal.present();
  }
}
