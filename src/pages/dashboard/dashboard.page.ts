import {
  animate,
  state,
  style,
  transition,
  trigger
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
  ViewChildren
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { Share } from '@capacitor/share';
import {
  AlertController,
  IonRouterOutlet,
  IonSlides,
  LoadingController,
  ModalController,
  ToastController
} from '@ionic/angular';
import { CupertinoPane, CupertinoSettings } from 'cupertino-pane';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { AuthService } from 'src/common/auth/_services/auth.service';
import { HelperService } from 'src/common/services/helper.service';
import { MapService } from 'src/common/services/map.service';
import { Manufacturer } from 'src/common/types';
import { MapPage } from '../map/map.page';
import { StartSessionModalComponent } from './components/start-session-modal/start-session-modal.component';
import { slideOpts } from './slider-config';
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
    private alertController: AlertController,
    private http: HttpClient,
    public helper: HelperService,
    private authService: AuthService,
    private toastCtrl: ToastController,
    public platform: Platform,
    private route: ActivatedRoute, 
    private loadingCtrl: LoadingController
  ) { }

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

  async ngOnInit() {
    
  }

  async ngAfterViewInit() {
    const loading = await this.loadingCtrl.create({translucent: true});
    loading.present()
    try {
      
      const data = await lastValueFrom(await this.http.get('api/manufacturers'));
      
      this.manufacturers = data;
      this.sorted = [...this.manufacturers];
      this.mainSlider?.update();
      

      this.audio = new Audio('assets/sounds/Shisha_Sound.mp3');
      this.audio.loop = false;

      const playSmoke = this.route.snapshot.queryParamMap.get('playSmoke');
      if (playSmoke) {
        this.showSmoke();
      }

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
    } catch (error) {
      (
        await this.toastCtrl.create({
          message: 'Daten konnten nicht geladen werden. Bitte prüfe Deine Internetverbindung.',
          translucent: true,
          position: 'top',
          duration: 4000,
        })
      ).present();
      
    }


    loading.dismiss();
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

  async selectSession(product: Manufacturer | any, type: string) {
    if(type=='manufactur') {
      (
        await this.toastCtrl.create({
          message: 'Wähle eine Sorte aus zum Starten',
          translucent: true,
          position: 'top',
          duration: 4000,
        })
      ).present();
      return;
    }
    /*
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
    */

    const manufacturer = this.manufacturers.find((manufacturer)=> manufacturer.id == product.manufacturer);
    const modal = await this.modalCtrl.create({
      component: StartSessionModalComponent,
      breakpoints: [0.0, 0.5, 0.7],
      initialBreakpoint: 0.5,
      swipeToClose: true,
      cssClass: 'smoke-start-modal',
      componentProps: {
        product,
        type,
        manufacturer
      }
    });

    await modal.present();

    const result = await modal.onWillDismiss();

    if (result.data && result.data.showSmoke) { this.showSmoke(); }
  }


  async openTelegramModal() {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertController.create({
        header: 'Benachrichtige deine Freunde über Telegram',
        message: 'Bitte gib deinen Telegram Benutzernamen ein',
        translucent: true,
        inputs: [
          {
            value: '',
            name: 'name',
            type: 'text',
            placeholder: 'Telegram Benutzername',
          },
        ],
        buttons: [
          {
            text: 'Hinzufügen',
            handler: async (data) => {
              const update = {
                telegramUsername: data.name
              }

              try {
                await this.http
                  .put('api/users/' + this.authService.user.id, update)
                  .toPromise();


                resolve(true);
              } catch (error) {
                (
                  await this.toastCtrl.create({
                    message: 'Benutzername bereits vorhanden',
                    translucent: true,
                    position: 'top',
                    duration: 4000,
                  })
                ).present();
              }
            },
          },
          {
            text: 'Mehr Infos',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
              resolve(false);
            },
          },
        ],
      });


      await alert.present();
    })

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
