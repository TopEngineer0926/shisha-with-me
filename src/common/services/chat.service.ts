import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  friends = [
    {
      id: 1,
      name: 'Mathis Monn',
      type: 'Freund',
      image: '/assets/mathis.png',
    },
    {
      id: 2,
      name: 'Daniel Ehrhardt',
      type: 'Freund',
      image:
        'https://scontent-muc2-1.xx.fbcdn.net/v/t1.0-9/15095590_1226055697437458_7597798733590853990_n.jpg?_nc_cat=107&_nc_sid=09cbfe&_nc_ohc=HRwklIQ7Eg4AX_1C_KG&_nc_ht=scontent-muc2-1.xx&oh=96bb77963c0e0bc3eb07610de41a4141&oe=5F9C0F57',
    },
    {
      id: 3,
      name: 'Kumpels',
      type: 'Gruppe',
      image:
        'https://images.pexels.com/photos/4843441/pexels-photo-4843441.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
      id: 4,
      name: 'Lee Parker',
      type: 'Freund',
      image: 'https://randomuser.me/api/portraits/men/81.jpg',
    },
    {
      id: 5,
      name: 'Ernest Reyes',
      type: 'Freund',
      image: 'https://randomuser.me/api/portraits/men/52.jpg',
    },
    {
      id: 6,
      name: 'Veronica Watts',
      type: 'Freundin',
      image: 'https://randomuser.me/api/portraits/women/87.jpg',
    },
  ];

  isConnected: boolean = true;

  async sendMessage(
    chatId: number,
    type: string,
    data: { message?: string; picture?: string; giphy_id?: string }
  ): Promise<any> {
    if (typeof data !== 'object') {
      throw new Error('data must be an object');
    }
    const tempMessage = {
      id: null,
      message: data.message,
      giphy_id: data.giphy_id,
      picture_1280x1280: data.picture,
      author: {
        id: 1,
        firstName: 'Daniel',
        lastName: 'Ehrhardt',
      },
      created_at: new Date(),
      type,
    };
    return tempMessage;
  }
}