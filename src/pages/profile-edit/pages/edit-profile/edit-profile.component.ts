import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';

import { Geolocation } from '@capacitor/geolocation';

import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/common/auth/_services/auth.service';
import { MapHelperService } from 'src/common/services/map-helper.service';

@Component({
  selector: 'creedle-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {

  currentUser: any;
  public model: {
    username: string;
    password: string;
    telegram: string;
  } = {
      username: '',
      password: '',
      telegram: ''
    }

  user: any



  constructor(
    private cdr: ChangeDetectorRef,
    private loadingCtrl: LoadingController,
    public mapHelperService: MapHelperService,
    private modalCtrl: ModalController,
    private http: HttpClient,
    private toastCtrl: ToastController,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    await this.loadUser()
    this.model.username = this.user.customUsername
    this.model.telegram = this.user.telegramUsername
  }

  async loadUser() {
    const data = await this.http
      .get('api/users/' + this.authService?.user.id)
      .toPromise();
    this.user = data;
    console.log('this.user', this.user);

    await this.authService.updateUser();
    this.cdr.detectChanges();
  }

  async save() {
    const update = {} as any

    if (this.model.password) update.password = this.model.password
    if (this.model.telegram != this.user.telegramUsername) update.telegramUsername = this.model.telegram
    if (this.model.username != this.user.customUsername) update.customUsername = this.model.username


    try {
      const user: any = await this.http.put('api/users/' + this.user.id, update).toPromise();
      await this.loadUser();
      (
        await this.toastCtrl.create({
          message: 'Änderungen gespeichert',
          translucent: true,
          position: 'top',
          duration: 4000
        })
      ).present()
    } catch (error) {
      (
        await this.toastCtrl.create({
          message: error,
          translucent: true,
          position: 'top',
          duration: 4000
        })
      ).present()

    }

  }

}
