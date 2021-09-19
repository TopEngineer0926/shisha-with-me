import { HelperService } from './../../../../common/services/helper.service';
import { Component, Input, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { AdPage } from '../../pages/ad/ad.page';

@Component({
  selector: 'app-ad-item',
  templateUrl: './ad-item.component.html',
  styleUrls: ['./ad-item.component.scss'],
})
export class AdItemComponent implements OnInit {
  @Input() ad: any;
  constructor(
    public helper: HelperService,
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet
  ) {}

  ngOnInit() {}

  async openAd() {
    const modal = await this.modalCtrl.create({
      component: AdPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        id: this.ad.id,
      },
    });
    return await modal.present();
  }
}
