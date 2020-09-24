import { Component, Input, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { MapService } from 'src/common/services/map.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @Input() user: any = { name: 'Mathis Monn' };
  elementType = 'canvas';
  value = 'Mathis';
  locationLoading: boolean = false;
  lat = 51.178418;
  lng = 9.95;
  zoom = 6;

  markers = [];

  constructor(
    public mapService: MapService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  async sendMessage() {
    const toast = await this.toastCtrl.create({
      duration: 3000,
      message: 'Nachricht wird versendet .. ',
    });
    toast.present();
  }
}
