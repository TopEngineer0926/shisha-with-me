import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  email: string;

  constructor(
    public authService: AuthService,
    private oneSignal: OneSignal,
    private http: HttpClient
  ) {
    if (this.authService?.user?.email) {
      this.email = this.authService.user.email;
    }
  }

  async getUser() {
    if (!this.authService.isLoggedIn) {
      return;
    }

    const user = await this.http.get('api​/users​/me').toPromise();

    return user;
    /*
    return await this.apollo
      .query({
        query: userQuery,
        variables: {
          email: this.email.trim(),
        },
      })
      .pipe(
        map(async (body: any) => {
          if (body?.data?.user) {
            this.authService.updateUser(body.data.user);
            return body.data.user;
          }
        })
      )
      .toPromise();*/
  }

  async updateUser(data) {
    if (Capacitor.isNativePlatform()) {
      await this.oneSignal.setLogLevel({ logLevel: 6, visualLevel: 0 });
      const ids = await this.oneSignal.getIds();
      data.pushId = ids;

      console.log(ids);
    }
    /*return await this.apollo
      .mutate({
        mutation: updateMutation,
        variables: {
          email: this.email.trim(),
          updateUser: data,
        },
      })
      .pipe(
        map((body: any) => {
          console.log(body);
          if (body?.data?.updateUser) {
            this.authService.updateUser(body.data.updateUser);
            return body.data.user;
          }
        })
      )
      .toPromise();*/
  }
}
