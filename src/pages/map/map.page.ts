import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GoogleMap } from '@angular/google-maps';
import { Event, NavigationStart, Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { Share } from '@capacitor/share';
import {
  IonModal,
  LoadingController,
  ModalController,
  PopoverController,
  ToastController,
} from '@ionic/angular';
import { lastValueFrom, Subscription } from 'rxjs';
import { AuthService } from 'src/common/auth/_services/auth.service';
import { UserService } from 'src/common/auth/_services/user.service';
import { MapService } from 'src/common/services/map.service';
import { ProfilePage } from '../profile/profile.page';
import { MapFilterComponent } from './components/map-filter/map-filter.component';
import { PlacePage } from './place/place.page';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@UntilDestroy()
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(GoogleMap) map: GoogleMap;
  @ViewChild(IonModal) filterModal: IonModal;
  locationLoading = false;
  infowindow: google.maps.InfoWindow;
  options: google.maps.MapOptions = {
    disableDefaultUI: true,
    styles: this.mapService.getStyles(),
    maxZoom: 22,
  };
  center: google.maps.LatLngLiteral = { lat: 51.178418, lng: 9.95 };
  zoom = 6;
  // markerOptions: google.maps.MarkerOptions = { draggable: false, icon: };
  markerPositions: google.maps.LatLngLiteral[] = [];

  users;
  locations;
  currentTab: 'map' | 'friends' = 'map';
  showFilterSheet = false;
  mapFilterForm: FormGroup;
  locationMarker = [];
  markers: google.maps.Marker[] = [];
  sub$: Subscription;

  constructor(
    public mapService: MapService,
    public popoverController: PopoverController,
    private modalCtrl: ModalController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private http: HttpClient,
    public formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private userService: UserService
  ) {}

  changeTab(ev) {
    this.currentTab = ev.detail.value;
  }

  openFilterSheet() {
    this.showFilterSheet = true;
  }

  async share() {
    await Share.share({
      title: 'Shisha With Me',
      text: `Lade dir jetzt Shisha With Me.`,
      url: 'https://shishawithme.com/',
      dialogTitle: 'Teile die App mit Freunden',
    });
  }

  async ngOnInit() {
    this.sub$ = this.router.events.subscribe(async (event: Event) => {
      if (event instanceof NavigationStart) {
        console.log('NavigationStart', event, this.modalCtrl);
        try {
          await this.modalCtrl?.dismiss();
        } catch (error) {}
      }
    });
    this.mapFilterForm = this.formBuilder.group({
      friends: [true],
      shishaShop: [true],
      shishaBar: [true],
    });
    const loading = await this.loadingCtrl.create({ translucent: true });
    loading.present();
    this.locationMarker = [];

    const users: any = await this.http.get('api/friends/friends').toPromise();
    console.log('users', users);
    this.users = users;
    users.map((location) => {
      if (location.location) {
        this.locationMarker.push({
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
        console.log(location);
        this.locationMarker.push({
          lat: location.location.lat,
          lng: location.location.lng,
          id: location.id,
          type: location.type,
        });
      }
    });
    this.addMarkersForPlaces(this.locationMarker);

    await loading.dismiss();
    await this.getCurrentPosition();
  }

  async ionViewWillLeave() {
    this.sub$?.unsubscribe();
    await this.modalCtrl?.dismiss();
  }

  ngOnDestroy() {
    console.log('ngOnDestroy')
    this.sub$?.unsubscribe();

  }

  ngAfterViewInit() {
    this.mapReady();
  }

  loadMarker() {}

  filterMarkers() {
    let filteredMarkers = this.locationMarker;

    if (!this.mapFilterForm.value.friends) {
      filteredMarkers = filteredMarkers.filter(
        (location) => location.type !== 'user'
      );
    }
    if (!this.mapFilterForm.value.shishaBar) {
      filteredMarkers = filteredMarkers.filter(
        (location) => location.type !== 'shisha_bar'
      );
    }
    if (!this.mapFilterForm.value.shishaShop) {
      filteredMarkers = filteredMarkers.filter(
        (location) => location.type !== 'shisha_shop'
      );
    }

    console.log('filteredMarkers', filteredMarkers);
    this.addMarkersForPlaces(filteredMarkers, true);
    this.filterModal?.dismiss();
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async mapReady() {
    const loading = await this.loadingCtrl.create({ translucent: true });
    loading.present();

    try {
      const user: any = await this.userService.getUser();
      console.log('iser', user);
      if (user?.location?.lat) {
        this.markerPositions = [
          {
            lat: user?.location?.lat,
            lng: user?.location?.lng,
          },
        ];
      }
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
    return new Promise(async (resolve, reject) => {
      this.locationLoading = true;
      try {
        const coordinates = await Geolocation.getCurrentPosition({
          enableHighAccuracy: false,
          timeout: 10000,
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
          lat: coordinates.coords.latitude,
          lng: coordinates.coords.longitude,
        };
        await lastValueFrom(
          this.http.put('api/users/' + this.authService.user.id, { location })
        );
      } catch (error) {
        const toast = await this.toastCtrl.create({
          message:
            'Standort konnte nicht ermittelt werden, bitte gebe deinen Standort in den Einstellungen frei.',
          translucent: true,
          position: 'top',
          duration: 3000,
          buttons: [
            {
              text: 'Ok',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              },
            },
          ],
        });
        toast.present();
        console.log('error', error);
        reject(error);
      } finally {
        this.locationLoading = false;
        resolve(true);
      }
    });
  }

  async openPlace(id) {
    console.log('openPlace', id);
    const elm = await this.modalCtrl.getTop();
    const modal = await this.modalCtrl.create({
      component: PlacePage,
      swipeToClose: true,
      // presentingElement: elm, //this.routerOutlet.nativeEl,
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

  getIconUrl(type) {
    switch (type) {
      case 'shisha_bar':
        return '/assets/icons/shisha-icon.svg';
      case 'shisha_shop':
        return '/assets/icons/cart-icon.svg';
      case 'user':
        return '/assets/icons/account-icon.svg';
    }
  }

  addMarkersForPlaces(places: any[], doBounds = false) {
    if (this.markers.length > 0) {
      this.markers.forEach((marker) => {
        marker.setMap(null);
      });
      this.markers = [];
    }

    if (places.length == 0) {
      return;
    }

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();
    places.forEach((place) => {
      const marker: any = new google.maps.Marker({
        map: this.map.googleMap,
        icon: {
          url: this.getIconUrl(place.type),
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        },
        position: { lat: place.lat, lng: place.lng },
      });

      marker.dataId = place.id;
      marker.dataType = place.type;

      this.markers.push(marker);

      google.maps.event.addListener(marker, 'click', async () => {
        console.log(marker);
        if (
          marker.dataType == 'shisha_bar' ||
          marker.dataType == 'shisha_shop'
        ) {
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
        id,
      },
    });
    return await modal.present();
  }
}
