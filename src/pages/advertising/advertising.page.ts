import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, LoadingController, ModalController, NavController } from '@ionic/angular';
import { AdSavedPage } from '../ad-saved/ad-saved.page';
import { HelperService } from './../../common/services/helper.service';
import { AdService } from './services/ad.service';

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
  searchTerm = ""
  sorted

  constructor(
    public helper: HelperService,
    public adService: AdService,
    private loadingCtrl: LoadingController,
    private nav: NavController, private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet,
  ) { }

  async ngOnInit() {
    this.load();
  }

  setTab(category) {
    console.log('category', category);
    this.selectedCategory = category;
    this.ads = category?.ads;

    this.topDeals = this.ads.filter((ad) => ad.topDeal == true);

    this.search()

  }

  async wishListPage() {
    // const elm = await this.modalCtrl.getTop();
    const modal = await this.modalCtrl.create({
      component: AdSavedPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  }

  search() {
    if (this.searchTerm == '') {
      this.sorted = [...this.ads];
      return;
    }

    this.sorted = this.ads.filter((element) => element.title.toLowerCase().includes(this.searchTerm.toLowerCase()))
  }

  async doRefresh(event) {
    await this.load();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

  async load() {
    const loading = await this.loadingCtrl.create({ translucent: true });
    loading.present();
    try {
      const data = await this.adService.load();
      this.data = data;
      this.ads = this.data[0]?.ads;
      this.selectedCategory = this.data[0];
      this.topDeals = this.ads.filter((ad) => ad.topDeal == true);

      this.sorted = this.ads

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

    this.search()

    console.log($event, this.data, this.ads);
  }
}
