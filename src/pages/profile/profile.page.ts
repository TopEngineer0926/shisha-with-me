import { ChatService } from 'src/common/services/chat.service';
import { Component, Input, OnInit } from '@angular/core';
import {
  ToastController,
  NavController,
  ModalController,
} from '@ionic/angular';
import { MapService } from 'src/common/services/map.service';
import { HttpClient } from '@angular/common/http';
import { HelperService } from 'src/common/services/helper.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @Input() id = 1;
  elementType = 'canvas';
  value = 'Mathis';
  locationLoading = false;
  user: any = {};

  markers = [];

  options: google.maps.MapOptions = {
    disableDefaultUI: true,
    styles: this.mapService.getStyles(),
    maxZoom: 22,
  };

  center: google.maps.LatLngLiteral = { lat: 51.178418, lng: 9.95 };
  zoom = 6;
  // markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];

  constructor(
    public mapService: MapService,
    private toastCtrl: ToastController,
    private chatService: ChatService,
    private modalCtrl: ModalController,
    private http: HttpClient,
    public helper: HelperService
  ) {}

  close() {
    this.modalCtrl.dismiss();
  }

  async ngOnInit() {
    if (this.id) {
      const user: any = await this.http.get('api/users/' + this.id).toPromise();
      console.log('user', user);
      this.user = user;
      if (user.location) {
        this.center = { lat: user.location.lat, lng: user.location.lng };
        this.markers.push({ lat: user.location.lat, lng: user.location.lng });
        this.zoom = 15;
      }
    } else {
      setTimeout(() => {
        this.modalCtrl.dismiss();
      }, 500);
    }
  }

  async sendMessage(message) {
    const body = { toUserId: this.id, message };
    await this.http.post('api/sessions/message', body).toPromise();
    const toast = await this.toastCtrl.create({
      duration: 3000,
      message: 'Nachricht wurde versendet ...',
      translucent: true,
      position: 'top',
    });
    toast.present();
  }
}
