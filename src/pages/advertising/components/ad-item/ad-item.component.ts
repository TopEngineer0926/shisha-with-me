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
  constructor(
    public helper: HelperService,
    private modalCtrl: ModalController,
    private navCtrl: NavController
    // private routerOutlet: IonRouterOutlet
  ) {}

  ngOnInit() {}

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
}
