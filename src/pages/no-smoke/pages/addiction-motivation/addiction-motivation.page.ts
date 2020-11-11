import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addiction-motivation',
  templateUrl: './addiction-motivation.page.html',
  styleUrls: ['./addiction-motivation.page.scss'],
})
export class AddictionMotivationPage implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }
}
