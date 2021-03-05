import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { get, set } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  wishlist: any[] = [];

  constructor(private toastCtrl: ToastController) {}

  async loadWishlist() {
    this.wishlist = await get('wishlist');
  }

  async saveWishlist() {
    await set('wishlist', this.wishlist);
  }

  async isInWishList(adItem) {
    return this.wishlist?.find((_adItem) => _adItem.id == adItem.id);
  }

  async addToWishlist(adItem) {
    this.wishlist.push(adItem);
    await this.saveWishlist();

    const toast = await this.toastCtrl.create({
      message: 'Eintrag gespeichert',
      translucent: true,
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
