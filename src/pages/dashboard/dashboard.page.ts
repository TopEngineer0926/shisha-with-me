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
  OnInit,
  ViewChild,
} from '@angular/core';
import { Plugins } from '@capacitor/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import {
  AlertController,
  IonRouterOutlet,
  IonSlides,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { CupertinoPane, CupertinoSettings } from 'cupertino-pane';
import { MapService } from 'src/common/services/map.service';
import { ImageSharePage } from '../image-share/image-share.page';
import { MapPage } from '../map/map.page';
import { slideOpts } from './slider-config';
import { Share } from '@capacitor/share';
import { Geolocation } from '@capacitor/geolocation';
import { SelectLocationPage } from '../select-location/select-location.page';
import { HttpClient } from '@angular/common/http';
import { HelperService } from 'src/common/services/helper.service';
import { AuthService } from 'src/common/auth/_services/auth.service';

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
export class DashboardPage implements AfterViewInit, OnDestroy, OnInit {
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
  markerPositions: google.maps.LatLngLiteral[] = [];

  loadIcons = false;

  slideOptsVert = {
    direction: 'vertical',
    ...slideOpts,
  };

  manufacturers;

  cupertino: boolean = false;
  myPane: CupertinoPane;

  constructor(
    public mapService: MapService,
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet,
    private localNotifications: LocalNotifications,
    private alertController: AlertController,
    private http: HttpClient,
    public helper: HelperService,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    const data = await this.http.get('api/manufacturers').toPromise();
    console.log('data', data);
    this.manufacturers = data;
  }

  async ngAfterViewInit() {
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
    this.myPane?.destroy();
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

  async selectSession(product, type) {
    const alert = await this.alertController.create({
      header: 'Wo wird geraucht?',
      translucent: true,
      buttons: [
        {
          text: 'Privat',
          handler: async () => {
            await this.startSession(product, type);
          },
        },
        {
          text: 'Shisha Bar',
          handler: async () => {
            // await this.startSession();
            await this.selectLocation(product, type);
          },
        },
      ],
    });

    await alert.present();
  }

  async selectLocation(product, type) {
    const modal = await this.modalCtrl.create({
      component: SelectLocationPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {},
    });
    modal.onDidDismiss().then(async (data) => {
      if (data?.data) {
        console.log(data);

        await this.startSession(product, type, data.data);
      }
    });
    return await modal.present();
  }

  async startSession(smokeProduct, type, location?) {
    let data: any = {
      start_user: this.authService.user.id.toString(),
    };
    if (location) {
      data.location = location.id;
    }
    if (type == 'product') {
      data.smoke_product = smokeProduct.id;
    } else {
      data.manufacturer = smokeProduct.id;
    }

    await this.http.post('api/sessions/start', data).toPromise();
    (
      await this.toastCtrl.create({
        message: 'Session wurde gestartet',
        duration: 4000,
      })
    ).present();

    this.visiblityState = 'shown';
    const video = this.videoElm.nativeElement;
    await this.audio.play();
    await video.play();
    video.addEventListener('ended', () => {
      setTimeout(() => {
        this.visiblityState = 'hidden';
        setTimeout(() => {
          video.currentTime = 0;
        }, 300);
      }, 150);

      // video.play();
    });

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

  /*
  async openImageModal() {
    const modal = await this.modalCtrl.create({
      component: ImageSharePage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {},
    });
    return await modal.present();
  }*/
}
