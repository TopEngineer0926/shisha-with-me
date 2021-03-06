import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { map, switchMap } from 'rxjs/operators';
import { get, remove, set } from 'src/common/services/storage.service';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn = false;
  user: any | User;
  device: any;

  constructor(
    private http: HttpClient,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {}

  async login(email: string, password: string) {
    const loginData = {
      identifier: email.trim(),
      password: password.trim(),
    };

    return this.http
      .post(`${environment.apiUrl}/auth/local`, loginData)
      .pipe(
        switchMap(async (res: any) => {
          console.log(res);
          if (res?.user) {
            this.user = res.user;
            await set('userData', { user: res.user, jwt: res.jwt });
          }
          return res;
        })
      )
      .toPromise();
  }

  async createUser(email: string, password: string) {
    const data: any = await this.http
      .post('api/auth/local/register', {
        username: email.trim(),
        email: email.trim(),
        password: password.trim(),
      })
      .toPromise();
    if (data?.user) {
      this.user = data.user;
      await set('userData', { user: data.user, jwt: data.jwt });
    }
    return data;
  }

  async updateUser() {
    const userMe: any = await this.http.get('api/users/me').toPromise();
    const user = await this.http.get('api/users/' + userMe.id).toPromise();
    this.user = user;
    const loginData = await get('userData');
    loginData.user = user;

    await set('userData', loginData);
    return user;
  }

  async showEmailConfirmAlert(email, backdropDismiss = false) {
    return new Promise(async (resolve) => {
      const alert = await this.alertCtrl.create({
        header: 'Vielen Dank!',
        translucent: true,
        backdropDismiss,
        message:
          'Geben Sie hier den Code ein, den Sie per E-Mail erhalten haben:',
        inputs: [
          {
            name: 'email',
            type: 'email',
            placeholder: 'E-Mail',
            value: email,
          },
          {
            name: 'emailCode',
            type: 'number',
            placeholder: 'E-Mail Code',
          },
        ],
        buttons: [
          { text: 'Abbrechen' },

          {
            text: 'Konto aktivieren',
            handler: async (data: { emailCode?: number; email?: string }) => {
              if (data.email && data.emailCode) {
                console.log(data);
                await this.activateAccount(
                  data.email,
                  data.emailCode.toString()
                );
                resolve(true);
              }
              return;
            },
          },
        ],
      });
      await alert.present();
    });
  }

  async activateAccount(email: string, emailCode: string) {
    /*return await this.apollo
      .mutate({
        mutation: activateAccountMutation,
        variables: {
          email,
          emailAuthCode: emailCode,
        },
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      )
      .toPromise();*/
  }

  async getPasswordCode(email: string) {
    return await this.http
      .get<any>(`${environment.apiUrl}/v1/user/reset?email=${email}`)
      .toPromise();
  }

  async changePassword(confirmCode: string, email: string, password: string) {
    return await this.http
      .post<any>(`${environment.apiUrl}/v1/user/reset`, {
        confirmCode,
        email,
        password,
      })
      .toPromise();
  }

  async logout() {
    this.isLoggedIn = false;
    console.log('logout');

    await remove('loggedIn');
    await remove('userData');
    await remove('loginData');

    this.navCtrl.navigateRoot(['/login']);
  }
}
