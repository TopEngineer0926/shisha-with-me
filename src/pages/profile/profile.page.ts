import { ChatService } from 'src/common/services/chat.service';
import { Component, Input, OnInit } from '@angular/core';
import {
  ToastController,
  NavController,
  ModalController,
} from '@ionic/angular';
import { MapService } from 'src/common/services/map.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @Input() id: number = 1;
  elementType = 'canvas';
  value = 'Mathis';
  locationLoading: boolean = false;
  user: any = {};

  markers = [];

  options: google.maps.MapOptions = {
    disableDefaultUI: true,
    styles: this.mapService.getStyles(),
  };

  center: google.maps.LatLngLiteral = { lat: 51.178418, lng: 9.95 };
  zoom = 6;
  // markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];

  constructor(
    public mapService: MapService,
    private toastCtrl: ToastController,
    private chatService: ChatService,
    private modalCtrl: ModalController
  ) {}

  close() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
    if (this.id) {
      this.user = this.chatService.friends.find(
        (friend) => friend.id == this.id
      );
    } else {
      setTimeout(() => {
        this.modalCtrl.dismiss();
      }, 500);
    }
  }

  async sendMessage() {
    const toast = await this.toastCtrl.create({
      duration: 3000,
      message: 'Nachricht wird versendet .. ',
    });
    toast.present();
  }
}
