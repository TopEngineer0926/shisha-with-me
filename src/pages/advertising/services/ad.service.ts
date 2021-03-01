import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class AdService {
  ads = [
    {
      category: 'Shisha',
      id: 1,
      topDeal: true,
      image: '/assets/ads/shisha/Smokezilla-Minya-Gold-Rainbow_1_SHWD15382.jpg',
      name: 'Smokezilla Minya Gold Rainbow',
      description:
        'Smokezilla Minya Gold Rainbow - Super Angebot, sofort versandfertig, nur solange der Vorrat reicht, Komplettset mit vier Anschlüssen, Diamond Molassefänger, 18/8 Schliffadapter Kopf sowe Schlauchadapter, Eloxiertes Aluminium, Inkl. Kaminkopfset, Kohlzange, 1x Schlauch + Knickschutz + Alumundstück inklusive ',
      offerPrice: '89,95',
      price: '109,99',
      link:
        'https://www.shisha-world.com/ath-shisha-t-brass-ba-collection-mit-safir-base--hurrem-rauchrohr?number=SHWD13594',
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
