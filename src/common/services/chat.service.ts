import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

export interface Author {
  id?: number;
  image?: string;
}
export interface Message {
  id?: number;
  author?: Author;
  type?: string;
  message?: string;
  giphy_id?: string;
}
export interface Friend {
  id: number;
  name: string;
  type: string;
  image: string;
  messages: Message[];
}
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  chats: any = [];
  friends: Friend[] = [
    {
      id: 1,
      name: 'Mathis Monn',
      type: 'Freund',
      image: '/assets/mathis.png',
      messages: [
        {
          id: 1,
          author: { id: 1 },
          type: '',
          message: `Danke für's Programmieren der App! 🤩`,
        },
        {
          id: 2,
          author: {
            id: 2,
            image:
              'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          },
          type: '',
          message: 'Easy - Gerne wieder! 🤝',
        },
        {
          id: 3,
          author: {
            id: 1,
          },
          type: '',
          message:
            'Heute Abend gehen wir erstmal eine Shisha rauchen - geht auf mich!',
          giphy_id: '',
        },
        {
          id: 4,
          author: { id: 1 },
          type: '',
          message: `Sollen wir zusammen Rauchen gehen?`,
        },
      ],
    },
  ];

  isConnected = true;

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
