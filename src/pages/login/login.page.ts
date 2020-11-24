import { Component, OnInit } from '@angular/core';
import {
  IonRouterOutlet,
  LoadingController,
  NavController,
  ModalController,
} from '@ionic/angular';
import { AgeValidationPage } from '../age-validation/age-validation.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,

    private routerOutlet: IonRouterOutlet,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    await this.openAgeValidation();
  }
  async openAgeValidation() {
    const modal = await this.modalCtrl.create({
      component: AgeValidationPage,
      cssClass: 'transparent-background',
      swipeToClose: false,
      backdropDismiss: false,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {},
    });
    return await modal.present();
  }

  async login(type: 'facebook' | 'google' | 'apple' | 'phone' | 'snapchat') {
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
      case 'snapchat':
        message = 'Login mit Snapchat ...';
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
