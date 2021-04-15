import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Plugins } from '@capacitor/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import {
  AlertController,
  IonRouterOutlet,
  IonSlides,
  ModalController,
} from '@ionic/angular';
import { CupertinoPane, CupertinoSettings } from 'cupertino-pane';
import { MapService } from 'src/common/services/map.service';
import { ImageSharePage } from '../image-share/image-share.page';
import { MapPage } from '../map/map.page';
import { slideOpts } from './slider-config';
const { Geolocation, Camera, Share } = Plugins;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('shown => hidden', animate('600ms')),
      transition('hidden => shown', animate('300ms')),
    ]),
  ],
})
export class DashboardPage implements AfterViewInit, OnDestroy {
  audio: HTMLAudioElement;
  @ViewChild('mainSlider') mainSlider: IonSlides;
  @ViewChild('map') map: google.maps.Map;
  @ViewChild('videoElm') videoElm: ElementRef<HTMLVideoElement>;
  slideOpts = slideOpts;
  locationLoading: boolean = false;
  visiblityState = 'hidden';

  options: google.maps.MapOptions = {
    disableDefaultUI: true,
    styles: this.mapService.getStyles(),
  };

  center: google.maps.LatLngLiteral = { lat: 51.178418, lng: 11 };
  zoom = 6;
  // markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];

  loadIcons = false;

  slideOptsVert = {
    direction: 'vertical',
    ...slideOpts,
  };

  slides = [
    {
      image: 'assets/images/slider/capital-bra.png',
    },
    {
      image: 'assets/images/slider/almassiva.png',
      children: [
        { image: 'assets/images/slider/flavor/almassiva.png' },
        { image: 'assets/images/slider/flavor/almassiva2.png' },
        { image: 'assets/images/slider/flavor/almassiva3.png' },
      ],
    },

    {
      image: 'assets/images/slider/zomo.png',
      children: [{ image: 'assets/images/slider/flavor/zomo.png' }],
    },
    {
      image: 'assets/images/slider/bushidu.png',
    },
    { image: 'assets/images/slider/holster.png' },
    { image: 'assets/images/slider/true-passion.png' },
    { image: 'assets/images/slider/shisha-station.png' },
  ];

  cupertino: boolean = false;
  myPane: CupertinoPane;

  constructor(
    public mapService: MapService,
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet,
    private localNotifications: LocalNotifications,
    private alertController: AlertController
  ) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.loadIcons = true;
      setTimeout(() => {
        this.mainSlider.slideTo(1);
        google.maps.event.trigger(this.map, 'resize');
      }, 100);
    }, 200);

    this.audio = new Audio('assets/sounds/Shisha_Sound.mp3');
    this.audio.loop = false;
  }

  ngOnDestroy() {
    this.myPane.destroy();
  }

  openMap() {
    this.cupertino = true;
    const settings: CupertinoSettings = {
      initialBreak: 'top',
      backdrop: true,
      backdropOpacity: 0.4,
      buttonClose: true,
      bottomOffset: 20,
      clickBottomOpen: true,
      fastSwipeClose: false,
      showDraggable: false,
      // parentElement: 'body',
    };
    if (this.myPane) {
      this.myPane.destroy();
    }
    this.myPane = new CupertinoPane('.cupertino-pane-home', settings);
    this.myPane.present({ animate: true });
    this.myPane.disableDrag();
  }

  async openMapModal() {
    const modal = await this.modalCtrl.create({
      component: MapPage,
      // swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {},
    });
    await modal.present();
  }

  async getCurrentPosition() {
    this.locationLoading = true;
    try {
      const coordinates = await Geolocation.getCurrentPosition();
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
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {},
    });
    return await modal.present();
  }

  async selectSession() {
    const alert = await this.alertController.create({
      header: 'Wo wird geraucht?',
      translucent: true,
      buttons: [
        {
          text: 'Privat',
          handler: async (blah) => {
            await this.startSession();
          },
        },
        {
          text: 'Shisha Bar',
          handler: async () => {
            await this.startSession();
          },
        },
      ],
    });

    await alert.present();
  }

  async startSession() {
    this.visiblityState = 'shown';
    const video = this.videoElm.nativeElement;
    await this.audio.play();
    await video.play();
    video.addEventListener('ended', () => {
      this.visiblityState = 'hidden';
      setTimeout(() => {
        video.currentTime = 0;
      }, 50);

      // video.play();
    });
    /*
    const alert = await this.alertCtrl.create({
      header: 'Session gestartet!',
      buttons: ['Ok'],
      translucent: true,
      backdropDismiss: true,
    });

    await alert.present();*/

    setTimeout(() => {
      this.localNotifications.schedule({
        id: 1,
        text: '💨 Frankenstraße 20, 74562 Wolpertshausen, Deutschland',
        title: 'Mathis raucht eine Shisha',
        attachments: [
          `https://maps.googleapis.com/maps/api/staticmap?center=Wolpertshausen&zoom=13&size=300x200&maptype=roadmap&key=AIzaSyDfBZEEoOwxq0nqGAtU49iNbsC8Lhp88pU`,
        ],
        actions: [
          { id: '1', title: 'Guter Rauch!' },
          { id: '2', title: 'Leg nochmal Kohle auf. Ich bin unterwegs!' },
        ],
      });
    }, 2000);

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
