import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class AdService {
  ads = [
    {
      id: 1,
      image: '/assets/images/advertising/1.png',
      name: 'The North Face 1985 Mountain Jacket "Black"',
      description: 'Lorem Impsum',
      offerPrice: '69,99',
      price: '99,99',
      link: 'https://google.de',
    },
    {
      id: 2,
      image: '/assets/images/advertising/2.png',
      name: 'The North Face 1985 Mountain Jacket "Black"',
      description: 'Lorem Impsum',
      offerPrice: '69,99',
      price: '99,99',
      link: 'https://google.de',
    },
    {
      id: 3,
      image: '/assets/images/advertising/3.png',
      name: 'The North Face 1985 Mountain Jacket "Black"',
      description: 'Lorem Impsum',
      offerPrice: '69,99',
      price: '99,99',
      link: 'https://google.de',
    },
  ];
}
