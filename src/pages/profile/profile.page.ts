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
  lat = 51.178418;
  lng = 9.95;
  zoom = 6;
  user: any = {};

  markers = [];

  constructor(
    public mapService: MapService,
    private toastCtrl: ToastController,
    private chatService: ChatService,
    private modalCtrl: ModalController
  ) {}

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
