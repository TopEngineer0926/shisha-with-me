import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.page.html',
  styleUrls: ['./send-message.page.scss'],
})
export class SendMessagePage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    const data = this.route.snapshot.queryParams;
    console.log('data', data);

    if (data.message && data.toUserId) {
      const body = { toUserId: data.toUserId, message: data.message };
      await this.http.post('api/sessions/message', body).toPromise();
    }

    (
      await this.toastCtrl.create({
        message: 'Nachricht wurde verschickt',
        duration: 4000,
      })
    ).present();
    this.navCtrl.navigateRoot(['/tabs/home']);
  }
}
