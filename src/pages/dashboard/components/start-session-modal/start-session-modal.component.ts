/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import {
  AlertController,
  IonSlides,
  LoadingController,
  ModalController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { AuthService } from 'src/common/auth/_services/auth.service';
import { HelperService } from 'src/common/services/helper.service';
import { MapService } from 'src/common/services/map.service';
import { Manufacturer } from 'src/common/types';
import { SelectLocationPage } from 'src/pages/select-location/select-location.page';
import { slideOpts } from '../../slider-config';
import { trigger, transition, animate, style } from '@angular/animations';
import { IdeaPage } from 'src/pages/idea/idea.page';

@Component({
  selector: 'app-start-session-modal',
  templateUrl: './start-session-modal.component.html',
  styleUrls: ['./start-session-modal.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('400ms ease-in', style({ transform: 'translateY(0%)' })),
      ]),
      transition(':leave', [
        animate('400ms ease-in', style({ transform: 'translateY(100%)' })),
      ]),
    ]),
  ],
})
export class StartSessionModalComponent implements OnInit {
  @Input() product: Manufacturer;
  @Input() manufacturer: Manufacturer;
  @Input() type: string;
  audio: HTMLAudioElement;
  @ViewChild('mainSlider') mainSlider: IonSlides;
  @ViewChild('map') map: google.maps.Map;
  @ViewChild('videoElm') videoElm: ElementRef<HTMLVideoElement>;
  @ViewChildren('subSlider') subSliders: QueryList<IonSlides>;
  slideOpts = slideOpts;
  locationLoading = false;
  visiblityState = 'hidden';
  selectLocationMode = false;
  nearbyShishaBars = [];

  constructor(
    public mapService: MapService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private http: HttpClient,
    public helper: HelperService,
    private authService: AuthService,
    private toastCtrl: ToastController,
    public platform: Platform,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    console.log('A', this.product);
    console.log('B', this.type);
  }

  addLineBreak(description) {
    return description.replace(/Geschmack:/g, 'Geschmack:<br/>');
  }

  private calculateDistance(lat1, lon1, lat2, lon2, unit) {
    console.log(lat1, lon1, lat2, lon2, unit);
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == 'K') {
      dist = dist * 1.609344;
    }
    if (unit == 'N') {
      dist = dist * 0.8684;
    }
    return dist;
  }

  public async selectLocation(): Promise<void> {
    if (this.authService.user.location) {
      const locations: any = await this.http
        .get('api/locations', { params: { type_eq: 'shisha_bar' } })
        .toPromise();
      console.log('locations', locations);

      locations.map((location) => {
        location.distance = this.calculateDistance(
          location.location.lat,
          location.location.lng,
          this.authService.user.location.lat,
          this.authService.user.location.lng,
          null
        );
      });

      const sorted = locations.sort((a, b) =>
        a.distance > b.distance ? 1 : -1
      );
      this.nearbyShishaBars = [sorted[0], sorted[1], sorted[2]];
      this.selectLocationMode = true;
    } else {
      this.openSearchLocationModal();
    }
  }

  async locationClicked(location) {
    await this.startSession(this.product, this.type, location);
  }

  async openSearchLocationModal() {
    const elm = await this.modalCtrl.getTop();
    const modal = await this.modalCtrl.create({
      component: IdeaPage,
      swipeToClose: true,
      presentingElement: elm,
      componentProps: {
        selectSishaBar: true,
      },
    });
    modal.onDidDismiss().then(async (data) => {
      /*if (data?.data) {
        console.log(data);

        await this.startSession(this.product, this.type, data.data);
      }*/
    });
    return await modal.present();
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
                telegramUsername: data.name,
              };

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
    });
  }

  async startSession(smokeProduct, type, location?) {
    const loading = await this.loadingCtrl.create({ translucent: true });
    loading.present();

    try {
      const data: any = {
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

      // show telegram modal on first session if no telegram is set
      const telegramUsername = this.authService.user.telegramUsername;
      if (!telegramUsername) {
        loading.dismiss();
        const hasSetANewName = await this.openTelegramModal();

        if (hasSetANewName) {
          await this.http.post('api/sessions/start', data).toPromise();

          (
            await this.toastCtrl.create({
              message: 'Deine Freunde wurden informiert',
              translucent: true,
              position: 'top',
              duration: 4000,
            })
          ).present();

          this.modalCtrl.dismiss({
            showSmoke: true,
          });
        }
      } else {
        await this.http.post('api/sessions/start', data).toPromise();

        (
          await this.toastCtrl.create({
            message: 'Deine Freunde wurden informiert',
            translucent: true,
            position: 'top',
            duration: 4000,
          })
        ).present();

        this.modalCtrl.dismiss({
          showSmoke: true,
        });
      }
    } catch (error) {
    } finally {
      loading.dismiss();
    }
  }
}
