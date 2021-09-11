import { AdService } from './services/ad.service';
import { HelperService } from './../../common/services/helper.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-advertising',
  templateUrl: './advertising.page.html',
  styleUrls: ['./advertising.page.scss'],
})
export class AdvertisingPage implements OnInit {
  data: any;
  ads: any;
  topDeals: any;
  selectedCategory: any;

  constructor(
    public helper: HelperService,
    public adService: AdService,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    this.load();
  }

  async doRefresh(event) {
    await this.load();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

  async load() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    try {
      const data = await this.adService.load();
      this.data = data;
      this.ads = this.data[0]?.ads;
      this.selectedCategory = this.data[0];
      this.topDeals = this.ads.filter((ad) => ad.topDeal == true);

      console.log('data', data);
    } catch (error) {
    } finally {
      loading.dismiss();
    }
  }

  segmentChanged($event) {
    this.selectedCategory = $event.detail.value;
    this.ads = $event.detail?.value?.ads;

    this.topDeals = this.ads.filter((ad) => ad.topDeal == true);

    console.log($event, this.data, this.ads);
  }
}
