import { HelperService } from './../../common/services/helper.service';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AddictionCounselingPage } from './pages/addiction-counseling/addiction-counseling.page';
import { AddictionInformationPage } from './pages/addiction-information/addiction-information.page';
import { AddictionMotivationPage } from './pages/addiction-motivation/addiction-motivation.page';
import Swiper from 'swiper';

@Component({
  selector: 'app-no-smoke',
  templateUrl: './no-smoke.page.html',
  styleUrls: ['./no-smoke.page.scss'],
})
export class NoSmokePage implements OnInit {
  constructor(
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet,
    public helper: HelperService
  ) {}

  ngAfterViewInit() {
    var swiperH = new Swiper('.swiper-container-h', {
      spaceBetween: 50,
      pagination: {
        el: '.swiper-pagination-h',
        clickable: true,
      },
    });
  }

  ngOnInit() {}

  async addictionCounseling() {
    const modal = await this.modalCtrl.create({
      component: AddictionCounselingPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {},
    });
    return await modal.present();
  }
  async addictionInformation() {
    const modal = await this.modalCtrl.create({
      component: AddictionInformationPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {},
    });
    return await modal.present();
  }

  async addictionMotivation() {
    const modal = await this.modalCtrl.create({
      component: AddictionMotivationPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {},
    });
    return await modal.present();
  }
}
