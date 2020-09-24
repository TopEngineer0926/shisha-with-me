import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  async login(type: 'facebook' | 'google' | 'apple' | 'phone') {
    let message;
    switch (type) {
      case 'facebook':
        message = 'Login mit Facebook ...';
        break;
      case 'google':
        message = 'Login mit Google ...';
        break;
      case 'apple':
        message = 'Login mit Apple ...';
        break;
      case 'phone':
        message = 'Login mit deiner Telefonnummer ...';
        break;
    }
    const loading = await this.loadingCtrl.create({ message });
    loading.present();

    setTimeout(async () => {
      await this.navCtrl.navigateRoot('/tabs/home');
      loading.dismiss();
    }, 2500);
  }
}
