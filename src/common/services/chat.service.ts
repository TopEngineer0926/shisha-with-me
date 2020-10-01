import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
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
