import { ThemeSelectorComponent } from './components/theme-selector/theme-selector.component';
import { ProfileEditPage } from './../profile-edit/profile-edit.page';
import { Component, OnInit } from '@angular/core';
import {
  ActionSheetController,
  IonRouterOutlet,
  ModalController,
  NavController,
  PopoverController,
} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { HelperService } from 'src/common/services/helper.service';
import { get, remove, set } from 'src/common/services/storage.service';
import { ProfilePage } from '../profile/profile.page';
import { IdeaPage } from '../idea/idea.page';

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

  theme = 'Blau';

  constructor(
    public helper: HelperService,
    private translate: TranslateService,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet,
    private popoverController: PopoverController,
    private actionSheetController: ActionSheetController,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    const language = await this.getLang();
    this.language = language;
  }

  async goToNoSmoke() {
    this.navCtrl.navigateForward('no-smoke');
  }

  async goToProfile() {
    const modal = await this.modalCtrl.create({
      component: ProfileEditPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  }

  async selectTheme(ev: any) {
    const popover = await this.popoverController.create({
      component: ThemeSelectorComponent,
      cssClass: 'my-custom-class',
      event: ev,
      animated: true,
      translucent: true,
    });
    return await popover.present();
  }

  async selectThemeNew() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Theme',
      translucent: true,
      buttons: [
        {
          text: 'Pink',
          cssClass: 'pink',
          handler: () => {
            console.log('Delete clicked');
          },
        },
        {
          text: 'Blau',
          cssClass: 'blue',
          handler: () => {
            console.log('Delete clicked');
          },
        },
        {
          text: 'Rot',
          cssClass: 'red',
          handler: () => {
            console.log('Delete clicked');
          },
        },
        {
          text: 'Gelb',
          cssClass: 'yellow',
          handler: () => {
            console.log('Share clicked');
          },
        },
        {
          text: 'Grün',
          cssClass: 'green',
          handler: () => {
            console.log('Play clicked');
          },
        },
        {
          text: 'Abbrechen',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();
  }

  async getLang() {
    return (await get('language')) || { text: 'Deutsch', code: 'de' };
  }

  public async selectLanguage(ev): Promise<any> {
    const actionSheetCtrl = await this.actionSheetCtrl.create({
      header: this.translate.instant('Sprache ändern'),
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

  async openContact() {
    // const elm = await this.modalCtrl.getTop();
    const modal = await this.modalCtrl.create({
      component: IdeaPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  }

  async changeLanguage(selection: { text: string; code: string }) {
    set('language', JSON.stringify(selection));
    this.language = selection;
    this.translate.use(selection.code);
  }

  async logout() {
    await remove('loggedIn');
    this.navCtrl.navigateRoot('/login');
  }
}
