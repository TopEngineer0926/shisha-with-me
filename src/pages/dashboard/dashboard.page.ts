import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Platform } from '@angular/cdk/platform';
import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Share } from '@capacitor/share';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import {
  AlertController,
  IonRouterOutlet,
  IonSlides,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { CupertinoPane, CupertinoSettings } from 'cupertino-pane';
import { AuthService } from 'src/common/auth/_services/auth.service';
import { HelperService } from 'src/common/services/helper.service';
import { MapService } from 'src/common/services/map.service';
import { MapPage } from '../map/map.page';
import { SelectLocationPage } from '../select-location/select-location.page';
import { slideOpts } from './slider-config';
import { filter, pairwise } from 'rxjs/operators';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RoutesRecognized,
} from '@angular/router';
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
  @ViewChildren('subSlider') subSliders: QueryList<IonSlides>;
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
  sorted;

  searchTerm;

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
    private toastCtrl: ToastController,
    public platform: Platform,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async showSmoke() {
    this.visiblityState = 'shown';
    const video = this.videoElm.nativeElement;
    await video.play();
    console.log(this.visiblityState);
    video.addEventListener('ended', () => {
      setTimeout(() => {
        this.visiblityState = 'hidden';
        setTimeout(() => {
          video.load();
        }, 300);
      }, 150);
    });
  }

  async ngOnInit() {}

  async ngAfterViewInit() {
    const playSmoke = this.route.snapshot.queryParamMap.get('playSmoke');
    if (playSmoke) {
      this.showSmoke();
    }

    const data = await this.http.get('api/manufacturers').toPromise();
    console.log('data', data);
    this.manufacturers = data;
    this.sorted = [...this.manufacturers];
    this.mainSlider?.update();
    setTimeout(() => {
      this.loadIcons = true;
      setTimeout(() => {
        // this.mainSlider.slideTo(0);
        // google.maps.event.trigger(this.map, 'resize');
      }, 100);
    }, 200);

    this.audio = new Audio('assets/sounds/Shisha_Sound.mp3');
    this.audio.loop = false;

    this.mainSlider.ionSlideDidChange.subscribe(async (ev) => {
      // console.log('change', ev);
      //this.mainSlider.slideTo(0);
      const prevIndex = await this.mainSlider.getPreviousIndex();
      const sliders = [];

      this.subSliders.forEach((slider) => {
        sliders.push(slider);
      });

      sliders[prevIndex]?.slideTo(0);
      // console.log('this.subSliders[prevIndex]', sliders[prevIndex], prevIndex);
    });
  }

  search() {
    if (this.searchTerm == '') {
      this.sorted = [...this.manufacturers];
      return;
    }
    const searched = this.manufacturers.map((element) => {
      return {
        ...element,
        smoke_products: element.smoke_products.filter((subElement) =>
          subElement.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        ),
      };
    });
    this.sorted = [...searched];
  }

  smokeProducts(sorted) {
    let show = sorted.some((item) => {
      return item.smoke_products?.length > 0;
    });
    return !show;
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
        translucent: true,
        position: 'top',
        duration: 4000,
      })
    ).present();

    this.showSmoke();

    /*setTimeout(() => {
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
    }, 2000);*/

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
