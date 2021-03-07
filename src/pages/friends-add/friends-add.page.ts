import { HelperService } from './../../common/services/helper.service';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

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

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private http: HttpClient,
    public helper: HelperService
  ) {}

  async ngOnInit() {
    await this.load();
  }

  async load() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    try {
      const data: any = await this.http
        .get(`${environment.apiUrl}/friends`)
        .toPromise();
      this.friends = data;
      console.log('data', data);
    } catch (error) {
    } finally {
      loading.dismiss();
    }
  }

  async doRefresh(event) {
    console.log('Begin async operation');
    await this.load();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
