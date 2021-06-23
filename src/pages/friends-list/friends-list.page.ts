import { HelperService } from './../../common/services/helper.service';
import { HttpClient } from '@angular/common/http';
import { ChatService } from './../../common/services/chat.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { CupertinoPane, CupertinoSettings } from 'cupertino-pane';
import { Plugins } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.page.html',
  styleUrls: ['./friends-list.page.scss'],
})
export class FriendsListPage implements OnInit, OnDestroy {
  elementType = 'canvas';
  value = 'Mathis';
  myPane: CupertinoPane;

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    public chatService: ChatService,
    public modalController: ModalController,
    private loadingCtrl: LoadingController,
    private http: HttpClient,
    public helper: HelperService
  ) {}

  async ngOnInit() {
    await this.load();
  }

  ngOnDestroy() {
    this.myPane?.destroy();
  }

  async load() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    try {
      const data: any = await this.http
        .get(`${environment.apiUrl}/chats`)
        .toPromise();
      this.chatService.chats = data;
      console.log('data', data);
    } catch (error) {
    } finally {
      loading.dismiss();
    }
  }

  async doRefresh(event) {
    console.log('Begin async operation');
    await this.load();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async openFriendAddList() {
    this.navCtrl.navigateForward('/friends-add');
  }

  async addFriend() {
    const settings: CupertinoSettings = {
      initialBreak: 'top',
      backdrop: true,
      backdropOpacity: 0.4,
      buttonClose: true,
      bottomOffset: 20,
      clickBottomOpen: true,
    };
    this.myPane = new CupertinoPane('.cupertino-pane', settings);
    this.myPane.present({ animate: true });
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

  async SocialSharing() {
    let shareRet = await Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies',
    });
  }
}
