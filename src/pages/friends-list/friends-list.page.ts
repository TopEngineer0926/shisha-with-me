import { HelperService } from './../../common/services/helper.service';
import { HttpClient } from '@angular/common/http';
import { ChatService } from './../../common/services/chat.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  AlertController,
  IonRouterOutlet,
  LoadingController,
  ModalController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { CupertinoPane, CupertinoSettings } from 'cupertino-pane';
import { Plugins } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { Share } from '@capacitor/share';
import { AuthService } from 'src/common/auth/_services/auth.service';
import { ProfilePage } from '../profile/profile.page';
import * as qs from 'qs';
@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.page.html',
  styleUrls: ['./friends-list.page.scss'],
})
export class FriendsListPage implements OnInit, OnDestroy {
  elementType = 'canvas';
  value = 'Mathis';
  myPane: CupertinoPane;

  requests;
  users;
  friends;

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    public chatService: ChatService,
    public modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private http: HttpClient,
    public helper: HelperService,
    private authService: AuthService,
    private routerOutlet: IonRouterOutlet,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    const queryOne = qs.stringify({
      _where: {
        _or: [
          { oneUid_eq: this.authService.user.id },
          { twoUid_eq: this.authService.user.id },
        ],
        isAccepted: false,
      },
    });

    const data = await this.http
      .get('api/friends' + '?' + queryOne)
      .toPromise();
    console.log('data', data);
    this.requests = data;

    /*const query = qs.stringify({
      _where: {
        _or: [
          { oneUid_eq: this.authService.user.id },
          { twoUid_eq: this.authService.user.id },
        ],
        isAccepted: true,
      },
    });*/

    const friends = await this.http.get('api/friends/friends').toPromise();

    console.log('friends', friends);
    this.friends = friends;
  }

  loadField(request, type) {
    if (type == 'id') {
      if (this.authService.user.id == request.oneUid) {
        return request.twoUid;
      } else {
        return request.oneUid;
      }
    }
    if (type == 'name') {
      if (this.authService.user.id == request.oneUid) {
        return request.twoName;
      } else {
        return request.oneName;
      }
    }
    if (type == 'image') {
      if (this.authService.user.id == request.oneUid) {
        return request.twoImage;
      } else {
        return request.oneImage;
      }
    }
  }

  async openFriend(id) {
    const modal = await this.modalCtrl.create({
      component: ProfilePage,

      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        id: id,
      },
    });
    return await modal.present();
  }

  async connect(request) {
    request.loading = true;
    const data = {
      isAccepted: true,
    };

    await this.http.put('api/friends/' + request.id, data).toPromise();
    (
      await this.toastCtrl.create({
        message: 'Anfrage wurde angenommen',
        duration: 4000,
      })
    ).present();
    await this.loadData();
    request.loading = false;
  }

  ngOnDestroy() {
    this.myPane?.destroy();
  }

  async load() {
    const loading = await this.loadingCtrl.create({ translucent: true });
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
    event.target.complete();
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
