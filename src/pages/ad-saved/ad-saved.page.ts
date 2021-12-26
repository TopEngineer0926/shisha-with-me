import { WishlistService } from './../../common/services/wishlist.service';
import { AdService } from './../advertising/services/ad.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ad-saved',
  templateUrl: './ad-saved.page.html',
  styleUrls: ['./ad-saved.page.scss'],
})
export class AdSavedPage implements OnInit {
  constructor(public adService: AdService, public wishlist: WishlistService, private modalCtrl: ModalController) { }

  close() {
    this.modalCtrl.dismiss();
  }

  async ngOnInit() {
    console.log('INITING');
    await this.wishlist.loadWishlist();
  }

  async doRefresh(event) {
    await this.wishlist.loadWishlist();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }
}
