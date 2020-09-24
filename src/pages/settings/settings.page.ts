import { Component, OnInit } from '@angular/core';
import {
  ActionSheetController,
  IonRouterOutlet,
  ModalController,
} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { HelperService } from 'src/common/services/helper.service';
import { get, set } from 'src/common/services/storage.service';
import { ProfilePage } from '../profile/profile.page';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  language: any = {
    text: 'Deutsch',
    code: 'de',
  };

  constructor(
    public helper: HelperService,
    private translate: TranslateService,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet
  ) {}

  async ngOnInit() {
    const language = await this.getLang();
    this.language = JSON.parse(language);
  }

  async goToProfile() {
    const modal = await this.modalCtrl.create({
      component: ProfilePage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  }

  async getLang() {
    return (await get('language')) || { text: 'Deutsch', code: 'de' };
  }

  public async selectLanguage(ev): Promise<any> {
    const actionSheetCtrl = await this.actionSheetCtrl.create({
      header: this.translate.instant('Select Language'),
      translucent: true,
      buttons: [
        {
          text: 'Deutsch',
          handler: () => {
            this.changeLanguage({ code: 'de', text: 'Deutsch' });
          },
        },
        {
          text: 'English',
          handler: () => {
            this.changeLanguage({ code: 'en', text: 'English' });
          },
        },
      ],
    });

    await actionSheetCtrl.present();
  }

  async changeLanguage(selection: { text: string; code: string }) {
    set('language', JSON.stringify(selection));
    this.language = selection;
    this.translate.use(selection.code);
  }
}
