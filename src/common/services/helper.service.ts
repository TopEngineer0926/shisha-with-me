import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';

import { Plugins } from '@capacitor/core';
import { get, set } from './storage.service';
const { Browser } = Plugins;

declare var window: any;
@Injectable({
  providedIn: 'root',
})
export class HelperService {
  darkModeEnabled: boolean = false;

  constructor(
    private alertController: AlertController,
    private translate: TranslateService
  ) {
    this.getDarkMode();
  }

  async openLink(url) {
    await Browser.open({ url: url });
  }

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
              resolve();
            },
          },
        ],
      });
      await alert.present();
    });
  }

  async getDarkMode() {
    const darkMode = await get('darkMode');

    if (darkMode) {
      this.darkModeEnabled = true;
    } else {
      this.darkModeEnabled = false;
    }

    return this.darkModeEnabled;
  }

  async setDarkMode(enabled: boolean) {
    await set('darkMode', enabled);
    this.darkModeEnabled = enabled;
    if (enabled) {
      window.activateDarkMode();
    } else {
      window.activateLightMode();
    }
  }
}
