import { ImageSharePage } from '../image-share/image-share.page';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';
import {
  IonRouterOutlet,
  IonSlides,
  ModalController,
  AlertController,
} from '@ionic/angular';
import { MapService } from 'src/common/services/map.service';
import { slideOpts } from './slider-config';
import { Swiper } from 'swiper';
import { StartSessionPage } from '../start-session/start-session.page';

const { Geolocation, Camera, Share } = Plugins;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements AfterViewInit {
  @ViewChild('mainSlider') mainSlider: IonSlides;
  slideOpts = slideOpts;
  locationLoading: boolean = false;
  lat = 51.178418;
  lng = 9.95;
  zoom = 6;

  markers = [];

  slideOptsVert = {
    direction: 'vertical',
    ...slideOpts,
  };
  slides = [
    { image: 'assets/images/slider/capital-bra.png' },

    {
      image: 'assets/images/slider/zomo.png',
      children: [{ image: 'assets/images/slider/flavor/almassiva.png' }],
    },
    {
      image: 'assets/images/slider/alfakher.png',
    },
    {
      image: 'assets/images/slider/bushidu.png',
      children: [{ image: 'assets/images/slider/flavor/zomo.png' }],
    },
    { image: 'assets/images/slider/holster.png' },
    { image: 'assets/images/slider/true-passion.png' },
    { image: 'assets/images/slider/shisha-station.png' },
  ];

  constructor(
    public mapService: MapService,
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet,
    private alertCtrl: AlertController
  ) {}

  ngAfterViewInit() {
    this.mainSlider.slideTo(1);
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

  async openImageModal() {
    const modal = await this.modalCtrl.create({
      component: ImageSharePage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {},
    });
    return await modal.present();
  }

  async startSession() {
    const alert = await this.alertCtrl.create({
      header: 'Session gestartet!',
      buttons: ['Ok'],
      translucent: true,
      backdropDismiss: true,
    });

    await alert.present();
    /*
    const modal = await this.modalCtrl.create({
      component: StartSessionPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {},
    });
    return await modal.present();*/
  }

  async sharePosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    const lat = coordinates.coords.latitude;
    const lng = coordinates.coords.longitude;

    await Share.share({
      title: 'Shisha With Me',
      text: `Meine aktuelle Position bei Sisha With Me ist:\n https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
      url: 'https://shishawithme.com/',
      dialogTitle: 'Teile deinen Standort',
    });
  }
}
