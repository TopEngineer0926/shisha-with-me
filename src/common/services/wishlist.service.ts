import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../auth/_services/auth.service';
import { get, set } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  wishlist: any[];


  constructor(
    private toastCtrl: ToastController,
    private authService: AuthService,
    private http: HttpClient
  ) { }

  async loadWishlist() {
    if(this.wishlist) {
      return;
    }
    // this.wishlist = await get('wishlist');
    await this.authService.updateUser();
    this.wishlist = this.authService.user.ads;
  }

  async saveWishlist() {
    console.log('saveWishlist');
    await this.http
      .put('api/users/' + this.authService.user.id, { ads: this.wishlist })
      .toPromise();

    await this.loadWishlist();
    // await set('wishlist', this.wishlist);
  }

  async isInWishList(adItem) {
    if (!adItem) {return false;}
    return this.wishlist?.find((_adItem) => _adItem.id == adItem.id);
  }

  async addToWishlist(adItem) {
    console.log('adItem', adItem, this.wishlist);
    if (!this.authService.user.ads) {
      this.authService.user.ads = [];
    }
    this.authService.user.ads.push(adItem);
    await this.saveWishlist();

    const toast = await this.toastCtrl.create({
      message: 'Eintrag gespeichert',
      translucent: true,
      position: 'top',
      duration: 3000,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    toast.present();
  }

  async removeFromWishlist(adItem) {
    this.wishlist = this.wishlist.filter((_adItem) => _adItem.id != adItem.id);

    await this.saveWishlist();
    const toast = await this.toastCtrl.create({
      message: 'Eintrag entfernt',
      translucent: true,
      position: 'top',
      duration: 3000,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    toast.present();
  }
}
