import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Share } from '@capacitor/share';
import { LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { AdService } from '../../services/ad.service';
import { HelperService } from './../../../../common/services/helper.service';
import { WishlistService } from './../../../../common/services/wishlist.service';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.page.html',
  styleUrls: ['./ad.page.scss'],
})
export class AdPage implements OnInit {
  @Input() id: number | string;
  ad: any;
  isInWishList = false;
  constructor(
    private route: ActivatedRoute,
    public adService: AdService,
    public helper: HelperService,
    public wishlist: WishlistService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController, private navCtrl: NavController, private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    const id = this.id || this.route.snapshot.params.id ;
    // this.ad = this.adService.ads[id - 1];
    await this.load(id);

    await this.wishlist.loadWishlist();
    console.log(this.wishlist.wishlist);
    this.isInWishList = !!(await this.wishlist.isInWishList(this.ad));
    console.log(this.isInWishList);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async shareAd() {
    await Share.share({
      title: 'Shisha With Me',
      text: `Das habe ich bei Shisha With Me gefunden: ${this.ad.link}`,
      url: this.ad.link,
      dialogTitle: 'Teile diesen Eintrag',
    });
  }

  async load(id) {
    const loading = await this.loadingCtrl.create({ translucent: true });
    loading.present();
    try {
      const data = await this.adService.loadOne(id);
      this.ad = data;
      console.log('this.ad', this.ad);
    } catch (error) {
      this.navCtrl.back();
      (
        await this.toastCtrl.create({
          message: 'Eintrag nicht mehr vorhanden.',
          translucent: true,
          position: 'top',
          duration: 4000,
        })
      ).present();
    } finally {
      loading.dismiss();
    }
  }

  async addOrRemoveFromWishList() {
    this.isInWishList
      ? this.wishlist.removeFromWishlist(this.ad)
      : this.wishlist.addToWishlist(this.ad);

    this.isInWishList = !!(await this.wishlist.isInWishList(this.ad));
  }
}
