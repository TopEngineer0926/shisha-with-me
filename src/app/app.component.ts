import { AfterViewInit, Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, StatusBarStyle, Style } from '@capacitor/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { HelperService } from 'src/common/services/helper.service';
import { get } from 'src/common/services/storage.service';
import { WishlistService } from './../common/services/wishlist.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  updateChecked = false;
  updateAvailable = false;
  constructor(
    private helperService: HelperService,
    private translate: TranslateService,
    private wishlist: WishlistService,
    private updates: SwUpdate
  ) {}

  get waitingForUpdates() {
    return !this.updateChecked || this.updateAvailable;
  }

  async ngAfterViewInit() {
    if (Capacitor.isNativePlatform()) {
      SplashScreen.hide();
      StatusBar.setStyle({ style: Style.Dark });
    }
    await this.wishlist.loadWishlist();
    const darkMode = await this.helperService.getDarkMode();
    await this.helperService.setDarkMode(darkMode);
    this.setLanguage();
    await this.initPush();
  }

  async initPush() {
    this.updates.available.subscribe(() => {
      this.updateAvailable = true;
      window.location.reload();
    });
    if (this.updates.isEnabled) {
      await this.updates.checkForUpdate();
    } else {
      console.log('Service worker updates are disabled.');
    }
    this.updateChecked = true;
  }

  async setLanguage() {
    let lang = (await get('language')) || null;
    lang = JSON.parse(lang);
    console.log(lang);
    if (lang) {
      this.translate.setDefaultLang(lang.code);
      this.translate.use(lang.code);
    } else {
      this.translate.setDefaultLang('de');
      this.translate.use('de');
    }
  }
}
