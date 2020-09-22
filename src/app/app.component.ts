import { AfterViewInit, Component } from '@angular/core';
import { Plugins, StatusBarStyle } from '@capacitor/core';

const { SplashScreen, StatusBar, Capacitor } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  constructor() {}
  async ngAfterViewInit() {
    StatusBar.setStyle({ style: StatusBarStyle.Dark });
    setTimeout(() => {
      SplashScreen.hide();
    }, 300);
  }
}
