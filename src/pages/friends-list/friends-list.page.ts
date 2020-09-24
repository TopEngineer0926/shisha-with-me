import {
  IonRouterOutlet,
  ModalController,
  NavController,
} from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ProfilePage } from '../profile/profile.page';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.page.html',
  styleUrls: ['./friends-list.page.scss'],
})
export class FriendsListPage implements OnInit {
  friends = [
    { name: 'Mathis Monn' },
    { name: 'Daniel Ehrhardt' },
    { name: 'Mathis Monn' },
    { name: 'Daniel Ehrhardt' },
    { name: 'Mathis Monn' },
    { name: 'Daniel Ehrhardt' },
    { name: 'Mathis Monn' },
    { name: 'Daniel Ehrhardt' },
    { name: 'Mathis Monn' },
    { name: 'Daniel Ehrhardt' },
    { name: 'Mathis Monn' },
    { name: 'Daniel Ehrhardt' },
  ];
  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet
  ) {}

  ngOnInit() {}

  async openFriend(user) {
    const modal = await this.modalCtrl.create({
      component: ProfilePage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        user,
      },
    });
    return await modal.present();
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
