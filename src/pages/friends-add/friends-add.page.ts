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
    const data: any = await this.http
      .get('api/users', { params: { email_contains: this.searchInput } })
      .toPromise();
    console.log('layers', data);
    this.users = data;
    // this.searchInput = '';
  }

  async sendRequest(user) {
    user.loading = true;
    const data = {
      fromUid: this.authService.user.id.toString(),
      fromName: this.authService.user.name,
      toUid: user.id.toString(),
      isAccepted: false,
    };

    await this.http.post('api/friend-requests', data).toPromise();
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
