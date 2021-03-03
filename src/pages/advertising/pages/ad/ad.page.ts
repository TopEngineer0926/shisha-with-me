import { WishlistService } from './../../../../common/services/wishlist.service';
import { HelperService } from './../../../../common/services/helper.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdService } from '../../services/ad.service';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.page.html',
  styleUrls: ['./ad.page.scss'],
})
export class AdPage implements OnInit {
  ad: any;
  isInWishList: boolean = false;
  constructor(
    private route: ActivatedRoute,
    public adService: AdService,
    public helper: HelperService,
    public wishlist: WishlistService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.ad = this.adService.ads[id - 1];

    await this.wishlist.loadWishlist();
    console.log(this.wishlist.wishlist);
    this.isInWishList = !!(await this.wishlist.isInWishList(this.ad));
    console.log(this.isInWishList);
  }

  async addOrRemoveFromWishList() {
    this.isInWishList
      ? this.wishlist.removeFromWishlist(this.ad)
      : this.wishlist.addToWishlist(this.ad);

    this.isInWishList = !!(await this.wishlist.isInWishList(this.ad));
  }
}
