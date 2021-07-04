import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';

import { Geolocation } from '@capacitor/geolocation';

import { LoadingController, ModalController } from '@ionic/angular';
import { MapHelperService } from 'src/common/services/map-helper.service';

@Component({
  selector: 'creedle-location-select',
  templateUrl: './location-select.component.html',
  styleUrls: ['./location-select.component.scss'],
})
export class LocationSelectComponent implements OnInit {
  locationLoading = false;
  saveLoading = false;
  options: any = {};

  constructor(
    private cdr: ChangeDetectorRef,
    private loadingCtrl: LoadingController,
    public mapHelperService: MapHelperService,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {}

  async getCurrentPosition() {
    this.locationLoading = true;
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log('coordinates', coordinates);
      this.options.center = {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude,
      };

      await this.findLocationT(coordinates.coords);
    } catch (error) {
      console.log('error', error);
    } finally {
      this.locationLoading = false;
    }
  }

  findLocationT(coords) {
    const latlng = {
      lat: parseFloat(coords.latitude),
      lng: parseFloat(coords.longitude),
    };
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: latlng }, (response: any) => {
      console.log('response', response);
      if (response[0]) {
        console.log(response[0]);
        const center = new google.maps.LatLng(
          coords.latitude,
          coords.longitude
        );

        /*const marker = new google.maps.Marker({
          map: this.data.map.googleMap,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 6.5,
            fillColor: '#0d144d',
            fillOpacity: 0.9,
            strokeWeight: 0,
          },
          position: center,
          title: 'Meine Position',
        });

        const circle = new google.maps.Circle({
          map: this.data.map.googleMap,
          radius: this.mapHelperService.radius * 1000 || 16093,
          fillColor: '#0d144d',
          fillOpacity: 0.1,
          strokeColor: '#0d144d',
          strokeOpacity: 0.4,
        });
        circle.bindTo('center', marker, 'position');

        this.data.map.googleMap.setCenter(center);
        this.data.map.googleMap.setZoom(15);*/

        this.mapHelperService.postalCode = '';
        this.mapHelperService.location = response[0];
        this.mapHelperService.postalCode = this.mapHelperService.getField(
          response[0].address_components,
          'postal_code'
        ).short_name;
        this.cdr.detectChanges();
      } else {
        window.alert('No results found');
      }
    });
  }

  async findLocation() {
    const loading = await this.loadingCtrl.create({ mode: 'md' });
    loading.present();

    const request = {
      query: this.mapHelperService.postalCode,
      fields: ['ALL'],
    };

    const service = new google.maps.places.PlacesService(
      document.createElement('div')
    );

    service.findPlaceFromQuery(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);
        if (results[0]) {
          this.mapHelperService.postalCode = '';
          console.log(results[0]);
          this.mapHelperService.location = results[0];
          this.cdr.detectChanges();
        }
      }
      loading.dismiss();
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async save() {
    this.saveLoading = true;
    await this.mapHelperService.save();
    this.saveLoading = false;
  }
}
