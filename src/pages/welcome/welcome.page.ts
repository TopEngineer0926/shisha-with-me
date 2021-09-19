import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    const alert = await this.alertCtrl.create({
      header: 'Altersprüfung 18+',
      message:
        'Für die Nutzung der App musst du mindestens 18 Jahre und älter sein. Bist du 18 Jahre oder älter?',
      translucent: true,
      buttons: [
        {
          text: 'Ja',
          role: 'Ja',
          cssClass: 'secondary',
          handler: () => {
            this.navCtrl.navigateForward('login');
          },
        },
        {
          text: 'Nein',
          handler: async () => {
            const alert = await this.alertCtrl.create({
              header: 'Kein Zutritt!',
              message: 'Die App ist nur für Personen ab 18 Jahren geeignet.',

              translucent: true,
              backdropDismiss: false,
            });
          },
        },
      ],
    });
    await alert.present();
  }

  signup() {
    this.navCtrl.navigateForward('/sign-up');
  }
}
