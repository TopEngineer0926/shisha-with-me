import { AfterViewInit, Component } from '@angular/core';
import { Plugins, StatusBarStyle } from '@capacitor/core';
import { HelperService } from 'src/common/services/helper.service';

const { SplashScreen, StatusBar, Capacitor } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  constructor(private helperService: HelperService) {}

  async ngAfterViewInit() {
    StatusBar.setStyle({ style: StatusBarStyle.Dark });

    const darkMode = await this.helperService.getDarkMode();
    await this.helperService.setDarkMode(darkMode);

    setTimeout(() => {
      SplashScreen.hide();
    }, 300);
  }
}
