import { Component, OnInit } from '@angular/core';

import { Plugins, CameraResultType, CameraPhoto } from '@capacitor/core';
const { Geolocation, Camera, Share } = Plugins;

@Component({
  selector: 'app-image-share',
  templateUrl: './image-share.page.html',
  styleUrls: ['./image-share.page.scss'],
})
export class ImageSharePage implements OnInit {
  image: CameraPhoto;

  constructor() {}

  ngOnInit() {
    this.takePicture();
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
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
