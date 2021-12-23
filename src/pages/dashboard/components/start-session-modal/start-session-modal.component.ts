import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AlertController, IonSlides, ModalController, Platform, ToastController } from '@ionic/angular';
import { AuthService } from 'src/common/auth/_services/auth.service';
import { HelperService } from 'src/common/services/helper.service';
import { MapService } from 'src/common/services/map.service';
import { Manufacturer } from 'src/common/types';
import { SelectLocationPage } from 'src/pages/select-location/select-location.page';
import { slideOpts } from '../../slider-config';

@Component({
  selector: 'app-start-session-modal',
  templateUrl: './start-session-modal.component.html',
  styleUrls: ['./start-session-modal.component.scss'],
})
export class StartSessionModalComponent implements OnInit {
  @Input() product: Manufacturer;
  @Input() type: string;
  audio: HTMLAudioElement;
  @ViewChild('mainSlider') mainSlider: IonSlides;
  @ViewChild('map') map: google.maps.Map;
  @ViewChild('videoElm') videoElm: ElementRef<HTMLVideoElement>;
  @ViewChildren('subSlider') subSliders: QueryList<IonSlides>;
  slideOpts = slideOpts;
  locationLoading: boolean = false;
  visiblityState = 'hidden';

  constructor(
    public mapService: MapService,
    private modalCtrl: ModalController,
    private localNotifications: LocalNotifications,
    private alertController: AlertController,
    private http: HttpClient,
    public helper: HelperService,
    private authService: AuthService,
    private toastCtrl: ToastController,
    public platform: Platform,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('A', this.product);
    console.log('B', this.type);
  }

  async selectLocation() {
    const elm = await this.modalCtrl.getTop();
    const modal = await this.modalCtrl.create({
      component: SelectLocationPage,
      swipeToClose: true,
      presentingElement: elm,
      componentProps: {},
    });
    modal.onDidDismiss().then(async (data) => {
      if (data?.data) {
        console.log(data);

        await this.startSession(this.product, this.type, data.data);
      }
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

    // show telegram modal on first session if no telegram is set
    const telegramUsername = this.authService.user.telegramUsername;
    if (!telegramUsername) {
      const hasSetANewName = await this.openTelegramModal();

      if (hasSetANewName) {
        await this.http.post('api/sessions/start', data).toPromise();

        (
          await this.toastCtrl.create({
            message: 'Session wurde gestartet',
            translucent: true,
            position: 'top',
            duration: 4000,
          })
        ).present();

        this.modalCtrl.dismiss({
          showSmoke: true
        })
      }
    } else {
      await this.http.post('api/sessions/start', data).toPromise();

      (
        await this.toastCtrl.create({
          message: 'Session wurde gestartet',
          translucent: true,
          position: 'top',
          duration: 4000,
        })
      ).present();

      this.modalCtrl.dismiss({
        showSmoke: true
      })
    }

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

}
