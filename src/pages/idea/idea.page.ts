import { UserService } from './../../common/auth/_services/user.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/common/auth/_services/auth.service';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.page.html',
  styleUrls: ['./idea.page.scss'],
})
export class IdeaPage implements OnInit {
  @Input() selectSishaBar: boolean = false;
  selection: string = 'idea';
  message: string;
  constructor(
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.selectSishaBar ? (this.selection = 'shisha-bar') : null;
    console.log('selection', this.selection);
  }

  async send() {
    if (!this.message) {
      return;
    }
    try {
      const data = {
        message: this.message,
        selection: this.selection,
        user: this.authService.user.id,
      };

      await this.httpClient.post('api/contacts', data).toPromise();

      (
        await this.toastCtrl.create({
          message: 'Nachricht wurde verschickt',
          translucent: true,
          position: 'top',
          duration: 4000,
        })
      ).present();
    } catch (error) {
      (
        await this.toastCtrl.create({
          message: 'Fehler beim senden der Nachricht',
          translucent: true,
          position: 'top',
          duration: 4000,
        })
      ).present();
    }

    this.modalCtrl.dismiss();
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
