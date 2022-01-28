import { WishlistService } from './../../../../common/services/wishlist.service';
import { HelperService } from './../../../../common/services/helper.service';
import { Component, Input, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController, NavController } from '@ionic/angular';
import { AdPage } from '../../pages/ad/ad.page';

@Component({
  selector: 'app-ad-item',
  templateUrl: './ad-item.component.html',
  styleUrls: ['./ad-item.component.scss'],
})
export class AdItemComponent implements OnInit {
  @Input() ad: any;
  @Input() modalOpen: boolean = false;
  isInWishList: boolean = false;
  constructor(
    public helper: HelperService,
    private modalCtrl: ModalController,
    private navCtrl: NavController, 
    private wishlist: WishlistService
    // private routerOutlet: IonRouterOutlet
  ) {}

 async ngOnInit() {
    await this.wishlist.loadWishlist();
    console.log(this.wishlist.wishlist);
    this.isInWishList = !!(await this.wishlist.isInWishList(this.ad));
  }

  async openAd() {
    const elm = await this.modalCtrl.getTop();
    const modal = await this.modalCtrl.create({
      component: AdPage,
      swipeToClose: true,
      presentingElement: elm,
      componentProps: {
        id: this.ad.id,
      },
    });
    return await modal.present();
  }

  open() {
    if(this.modalOpen)
      this.modalCtrl?.dismiss()
    setTimeout(() =>{
      this.navCtrl.navigateForward(['/tabs/advertising', this.ad.id])
    }, this.modalCtrl ? 200 : 0)
    
  }

  async addOrRemoveFromWishList($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.isInWishList
    ? this.wishlist.removeFromWishlist(this.ad)
    : this.wishlist.addToWishlist(this.ad);

    this.isInWishList = !!(await this.wishlist.isInWishList(this.ad));

  }
}
