import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AppService {
  public locked = true;
  public appUnlocked = false;
  loading = false;
  backdrop = false;
  loadingElm: any;
  loadingCounter = 0;

  constructor(
    public toastService: ToastrService,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private translate: TranslateService,
    private httpClient: HttpClient
  ) {}

  confirmDelete(message?) {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertController.create({
        header: this.translate.instant('Löschen'),
        message: message || 'Möchten Sie diesen Eintrag wirklich löschen?',
        buttons: [
          {
            text: this.translate.instant('Abbrechen'),
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
              reject();
            },
          },
          {
            text: this.translate.instant('Löschen'),
            role: 'delete',
            cssClass: 'danger',
            handler: async (data) => {
              resolve(data);
            },
          },
        ],
      });
      await alert.present();
    });
  }

  async isLoading(loading: boolean, fullLoader: boolean = true) {
    if (loading) {
      if (this.loadingCounter > 0) {
        this.loadingCounter++;
      } else {
        this.loadingCounter = 1;
        this.loading = true;
        if (fullLoader) {
          this.loadingElm = await this.loadingCtrl.create({
            backdropDismiss: false,
            duration: 10000,
          });
          await this.loadingElm.present();
        }
      }
    }
    if (!loading) {
      if (this.loadingCounter > 1) {
        this.loadingCounter--;
      } else {
        this.loadingCounter = 0;
        this.loading = false;
        if (this.loadingElm) {
          const loadingElm = this.loadingElm;
          this.loadingElm = null;
          await loadingElm.dismiss();
        }
      }
    }
  }
}
