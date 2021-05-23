import { AfterViewInit, Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
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
  constructor(
    private helperService: HelperService,
    private translate: TranslateService,
    private wishlist: WishlistService
  ) {}

  async ngAfterViewInit() {
    await this.wishlist.loadWishlist();
    if (Capacitor.isNative) {
      // StatusBar.setStyle({ style: StatusBarStyle.Light });
    }

    const darkMode = await this.helperService.getDarkMode();
    await this.helperService.setDarkMode(darkMode);

    SplashScreen.hide();

    this.setLanguage();
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
