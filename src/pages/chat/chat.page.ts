import { HttpClient } from '@angular/common/http';
import { HelperService } from './../../common/services/helper.service';
import { ProfilePage } from './../profile/profile.page';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {
  ActionSheetController,
  IonContent,
  IonRouterOutlet,
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { ChatService } from 'src/common/services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  chat: any = {
    chat_members: [
      { user: { id: 1, name: 'Test' } },
      {
        user: {
          id: 2,
          name: '',
          image: '',
        },
      },
    ],
  };

  messages: any = [];
  userActive: boolean = true;
  @ViewChild(IonContent) content: IonContent;

  api = {
    userStorage: {
      id: 1,
      name: 'Daniel',
      picture_50x50: '',
    },
    exceptMe(array: any, pathToUser?: string): any {
      return typeof array === 'object'
        ? array.filter((item) => {
            return (
              (typeof item[pathToUser] !== 'undefined' &&
              item[pathToUser] !== null
                ? item[pathToUser].id
                : item.id) !== this.userStorage.id
            );
          })
        : array;
    },
  };

  id: number;

  chatNew: any;

  constructor(
    public chatService: ChatService,
    private actionSheetCtrl: ActionSheetController,
    private cdr: ChangeDetectorRef,
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    public helper: HelperService,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      const chatPartner = this.chatService.friends.find(
        (friend) => friend.id == this.id
      );
      console.log(chatPartner);
      this.chat.chat_members[1].user.name = chatPartner.name;
      this.chat.chat_members[1].user.image = chatPartner.image;

      await this.load();
    } else {
      this.navCtrl.back();
    }
  }

  async load() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    try {
      const data: any = await this.http
        .get(`${environment.apiUrl}/chats/${this.id}`)
        .toPromise();
      this.chatNew = data;
      console.log('data', data);
    } catch (error) {
    } finally {
      loading.dismiss();
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom(300);
      }
    }, 50);
  }

  async onSubmitMessage(data) {
    try {
      let message;
      if (data.type === 'giphy') {
        message = await this.chatService.sendMessage(this.chat.id, 'giphy', {
          giphy_id: data.giphy.id,
        });
      } else if (data.type === 'picture') {
        message = await this.chatService.sendMessage(this.chat.id, 'picture', {
          picture: data.picture,
        });
      } else {
        message = await this.chatService.sendMessage(this.chat.id, 'text', {
          message: data.message,
        });
      }
      this.messages.push(message);
    } catch (e) {
      console.error(e);
    } finally {
      this.scrollToBottom();
    }
  }

  async openFriend(user) {
    const modal = await this.modalCtrl.create({
      component: ProfilePage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        id: this.id,
      },
    });
    return await modal.present();
  }

  public async onMessageHold(item: any): Promise<any> {
    if (
      item.contactId === item.contactId // User
    ) {
      const actionSheet = await this.actionSheetCtrl.create({
        translucent: true,
        buttons: [
          {
            text: 'Info',
            icon: 'mail',
            handler: () => {
              item.info = !item.info;
              this.cdr.detectChanges();
            },
          },
          {
            text: 'Öffnen',
            icon: 'eye',
            handler: () => {
              if (item.giphy_id) {
                /*this.viewImage(
                  `https://media.giphy.com/media/${item.giphy_id}/giphy.gif`
                );*/
              } else {
                //this.viewImage(item.picture_1280x1280);
              }
            },
          },
          {
            text: 'Abbrechen',
            role: 'cancel',
            handler: () => {},
          },
        ],
      });
      await actionSheet.present();
    }
  }
}
