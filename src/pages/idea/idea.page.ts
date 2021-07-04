import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.page.html',
  styleUrls: ['./idea.page.scss'],
})
export class IdeaPage implements OnInit {
  constructor(
    private toastCtrl: ToastController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  async send() {
    (
      await this.toastCtrl.create({
        message: 'Nachricht wurde verschickt',
        duration: 4000,
      })
    ).present();
    this.modalCtrl.dismiss();
  }
}
