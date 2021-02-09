import { AlertController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CameraPhoto, CameraResultType, CameraSource, Plugins } from '@capacitor/core';
const { Geolocation, Camera, Share } = Plugins;

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  image: CameraPhoto | any = { webPath: '/assets/mathis.png' };

  profile = {
    name: 'Mathis Monn',
    phoneNumber: '+49 1516 1018772',
    sessionDuration: 120,
    myShisha: 'INVI Tesseract',
    myShishaHead: 'KS APPO BlACK-Edition',
    myMolassesCatcher: 'Smokezilla Molassefänger Diamond 18/7 Clear',
  };

  constructor(
    private alertController: AlertController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  segmentChanged($event) {
    this.profile.sessionDuration = $event.detail.value;
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async change(mode, value) {
    let text, inputType;

    switch (mode) {
      case 'name':
        text = 'Anzeigename';
        inputType = 'text';
        break;
      case 'phoneNumber':
        text = 'Telefonnummer';
        inputType = 'tel';
        break;
    }
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ändern',
      translucent: true,
      inputs: [
        {
          value,
          name: 'name',
          type: inputType,
          placeholder: text,
        },
      ],
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Speichern',
          handler: (data) => {
            console.log(data);
            if (mode == 'name') {
              this.profile.name = data.name;
            }
            if (mode == 'phoneNumber') {
              this.profile.phoneNumber = data.name;
            }
            console.log('Confirm Ok');
          },
        },
      ],
    });

    await alert.present();
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      source: CameraSource.Prompt,
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    this.image = image;
  }
}
