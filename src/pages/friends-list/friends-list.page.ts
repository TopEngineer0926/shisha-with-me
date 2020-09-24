import {
  IonRouterOutlet,
  ModalController,
  NavController,
} from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ProfilePage } from '../profile/profile.page';
import { CupertinoPane, CupertinoSettings } from 'cupertino-pane';

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
  elementType = 'canvas';
  value = 'Mathis';
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

  async addFriend() {
    const settings: CupertinoSettings = {
      initialBreak: 'bottom',
      darkMode: true,
      backdrop: true,
      backdropOpacity: 0.4,
      buttonClose: true,
      bottomOffset: 20,
      clickBottomOpen: true,
    };
    const myPane = new CupertinoPane('.cupertino-pane', settings);
    myPane.present();
  }
}
