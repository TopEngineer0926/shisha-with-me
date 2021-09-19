import { HttpClient } from '@angular/common/http';
import { LoadingController, ToastController } from '@ionic/angular';
import { HelperService } from './../../services/helper.service';
import { ChatService } from 'src/common/services/chat.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-friends-add-list',
  templateUrl: './friends-add-list.component.html',
  styleUrls: ['./friends-add-list.component.scss'],
})
export class FriendsAddListComponent implements OnInit {
  friends = [
    {
      name: 'Daniel Ehrhardt',
      platform: 'Instagram',
    },
  ];

  constructor(
    public chatService: ChatService,
    public helper: HelperService,
    private loadingCtrl: LoadingController,
    private http: HttpClient,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    await this.load();
  }

  async load() {
    const loading = await this.loadingCtrl.create({ translucent: true });
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

  async connect(friend) {
    const toast = await this.toastCtrl.create({
      message: 'Anfrage gesendet',
      translucent: true,
      position: 'top',
      duration: 3000,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    toast.present();
  }
}
