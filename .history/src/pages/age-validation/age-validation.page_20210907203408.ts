import { HelperService } from 'src/common/services/helper.service';
import { Component, OnInit } from '@angular/core';
import {
  ToastController,
  AlertController,
  ModalController,
} from '@ionic/angular';

@Component({
  selector: 'app-age-validation',
  templateUrl: './age-validation.page.html',
  styleUrls: ['./age-validation.page.scss'],
})
export class AgeValidationPage implements OnInit {
  year: number;

  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    public helperService: HelperService
  ) {}

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }

  async validate() {
    const date = new Date(this.year, 1, 1);
    const age = this._calculateAge(date);
    if (age < 18) {
      const alert = await this.alertCtrl.create({
        header: 'Kein Zutritt!',
        message: 'Die App ist nur für Personen ab 18 Jahren geeignet.',

        translucent: true,
        backdropDismiss: false,
      });

      await alert.present();
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Vielen Dank für deine Verifizierung',
      });
      this.modalCtrl.dismiss();
    }
  }

  _calculateAge(birthday) {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
