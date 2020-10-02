import { ChatService } from './../../common/services/chat.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { CupertinoPane, CupertinoSettings } from 'cupertino-pane';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.page.html',
  styleUrls: ['./friends-list.page.scss'],
})
export class FriendsListPage implements OnInit {
  elementType = 'canvas';
  value = 'Mathis';

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    public chatService: ChatService
  ) {}

  ngOnInit() {}

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async addFriend() {
    const settings: CupertinoSettings = {
      initialBreak: 'top',
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

  async createGroup() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Gruppe erstellen',
      translucent: true,
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Name',
        },
      ],
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Erstellen',
          handler: () => {
            console.log('Confirm Ok');
          },
        },
      ],
    });

    await alert.present();
  }
}
