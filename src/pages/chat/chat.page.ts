import { ProfilePage } from './../profile/profile.page';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {
  ActionSheetController,
  IonContent,
  IonRouterOutlet,
  ModalController,
} from '@ionic/angular';
import { ChatService } from 'src/common/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  chat: any = {
    chat_members: [
      { user: { id: 1, first_name: 'Test', last_name: 'Test' } },
      {
        user: {
          id: 2,
          first_name: 'Daniel',
          last_name: 'Ehrhardt',
          picture_50x50:
            'https://images.pexels.com/photos/343717/pexels-photo-343717.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        },
      },
    ],
  };
  messages: any = [
    {
      id: 1,
      author: { id: 1 },
      type: '',
      message: 'tester',
    },
    {
      id: 2,
      author: {
        id: 2,
        picture_50x50:
          'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      },
      type: '',
      message: 'tester',
    },
    {
      id: 3,
      author: {
        id: 3,
        picture_50x50:
          'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      },
      type: '',
      message: '',
      giphy_id: 'Icv7Clq2I7rvLTHqRV',
    },
  ];
  userActive: boolean = true;
  @ViewChild(IonContent) content: IonContent;

  api = {
    userStorage: {
      id: 1,
      first_name: 'Daniel',
      last_name: 'Ehrhardt',
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

  constructor(
    public chatService: ChatService,
    private actionSheetCtrl: ActionSheetController,
    private cdr: ChangeDetectorRef,
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet
  ) {}

  ngOnInit() {}

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
        user,
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
