import { HelperService } from './../../common/services/helper.service';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  ToastController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/common/auth/_services/auth.service';
import * as qs from 'qs';

@Component({
  selector: 'app-friends-add',
  templateUrl: './friends-add.page.html',
  styleUrls: ['./friends-add.page.scss'],
})
export class FriendsAddPage implements OnInit {
  friends = [
    {
      name: 'Daniel Ehrhardt',
      platform: 'Instagram',
    },
  ];

  users = [];
  searchInput = '';

  constructor(
    private modalCtrl: ModalController,
    private http: HttpClient,
    public helper: HelperService,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  async search() {
    const query = qs.stringify({
      _where: {
        _and: [
          { email_contains: this.searchInput },
          { id_ne: this.authService.user.id },
        ],
      },
    });

    const data: any = await this.http
      .get('api/users' + '?' + query)
      .toPromise();
    console.log('layers', data);
    this.users = data;
    // this.searchInput = '';
  }

  async sendRequest(user) {
    user.loading = true;
    const query = qs.stringify({
      _where: {
        _or: [
          { initiatorUid_eq: user.id },
          { initiatorUid_eq: this.authService.user.id },
        ],
        isAccepted: false,
      },
    });
    const friends: any = await this.http
      .get('api/friends' + '?' + query)
      .toPromise();

    console.log(friends, typeof friends);
    if (!(friends.length === 0)) {
      (
        await this.toastCtrl.create({
          message: 'Anfrage bereits verschickt',
          duration: 4000,
        })
      ).present();
      user.isFriend = true;
      user.loading = false;
      return;
    }
    console.log(friends);

    const data = {
      initiatorUid: this.authService.user.id.toString(),
      oneUid: this.authService.user.id.toString(),
      oneName: this.authService.user.name,
      oneImage: this.authService.user.image,
      twoUid: user.id.toString(),
      twoImage: user.image,
      twoName: user.name,

      isAccepted: false,
    };

    await this.http.post('api/friends', data).toPromise();
    (
      await this.toastCtrl.create({
        message: 'Anfrage wurde verschickt',
        duration: 4000,
      })
    ).present();
    user.isFriend = true;
    user.loading = false;
  }

  selectLoaction(location) {
    this.modalCtrl.dismiss(location);
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
