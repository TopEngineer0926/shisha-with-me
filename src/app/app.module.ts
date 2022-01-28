import { OneSignal } from '@ionic-native/onesignal/ngx';
import { registerLocaleData } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ApiInterceptor } from 'src/common/auth/_helpers/api.interceptor';
import { JwtInterceptor } from 'src/common/auth/_helpers/jwt.interceptor';
import { ErrorInterceptor } from 'src/common/auth/_helpers/error.interceptor';

registerLocaleData(localeDe, 'de', localeDeExtra);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'de',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserModule,
    LazyLoadImageModule,
    IonicModule.forRoot({
      backButtonText: '',
      mode: 'ios',
    }),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    ToastrModule.forRoot({
      timeOut: 5000,
      enableHtml: true,
      progressBar: true,
    }),
  ],
  providers: [
    OneSignal,
    LocalNotifications,
    DocumentViewer,
    LaunchNavigator,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    {
      provide: LOCALE_ID,
      useValue: 'de-DE',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
