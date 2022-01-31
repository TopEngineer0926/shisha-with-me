import { HelperService } from './../../common/services/helper.service';
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
export class FriendsAddPage {
  friends = [];
  users = [];
  searchInput = '';
  searchForProperty = 'customUsername';
  searching = false;

  constructor(
    private modalCtrl: ModalController,
    private http: HttpClient,
    public helper: HelperService,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {}

  segmentChanged(ev) {
    this.searchForProperty = ev.detail.value;
    this.search();
  }

  async search() {
    if (this.searchInput.length === 0) {
      this.users = [];
      return;
    }

    this.searching = true;
    const filterObject = {};

    let searchString = this.searchInput.replace('+49', '').replace('0049', '');
    if (
      this.searchForProperty === 'phoneNumber' &&
      searchString.startsWith('0')
    ) {
      searchString = searchString.substring(1);
    }

    filterObject[this.searchForProperty + '_contains'] = searchString;
    const query = qs.stringify({
      _where: {
        _and: [filterObject, { id_ne: this.authService.user.id }],
      },
    });

    const searchResults: any = await this.http
      .get('api/users' + '?' + query)
      .toPromise();
    const friendsResult: any = await this.http.get('api/friends/friends').toPromise();
    console.log('SEARCH RESULTS:', searchResults)
    console.log('FRIENDS:', friendsResult);
  
    this.friends = friendsResult;
    this.users = searchResults;
    this.searching = false;
  }

  areFriends(id): boolean {
    return this.friends.findIndex((el) => el.id == id) != -1
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
          translucent: true,
          position: 'top',
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
      oneName:
        this.authService.user.name || this.authService.user.customUsername,
      oneImage: this.authService.user.image,
      twoUid: user.id.toString(),
      twoImage: user.image,
      twoName: user.name || user.customUsername,
      isAccepted: false,
    };

    await this.http.post('api/friends', data).toPromise();
    (
      await this.toastCtrl.create({
        message: 'Anfrage wurde verschickt',
        translucent: true,
        position: 'top',
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
