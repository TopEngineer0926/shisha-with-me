import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { ModalController } from '@ionic/angular';
import {
  Camera,
  CameraResultType,
  CameraSource,
  CameraPhoto,
} from '@capacitor/camera';

@Component({
  selector: 'app-image-share',
  templateUrl: './image-share.page.html',
  styleUrls: ['./image-share.page.scss'],
})
export class ImageSharePage implements OnInit {
  image: CameraPhoto;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.takePicture();
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      source: CameraSource.Prompt,
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      promptLabelHeader: '',
      promptLabelCancel: 'Abbrechen',
      promptLabelPhoto: 'Foto aufnehmen',
      promptLabelPicture: 'Foto auswählen',
    });

    this.image = image;
  }

  share() {
    Plugins.FileSharer.share({
      filename: 'shishawithme.jpeg',
      base64Data: this.image.base64String,
      contentType: 'application/jpeg',
    })
      .then(() => {
        // do sth
      })
      .catch((error) => {
        console.error('File sharing failed', error.message);
      });
  }
}
