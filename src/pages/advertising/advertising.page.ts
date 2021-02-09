import { AdService } from './services/ad.service';
import { HelperService } from './../../common/services/helper.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advertising',
  templateUrl: './advertising.page.html',
  styleUrls: ['./advertising.page.scss'],
})
export class AdvertisingPage implements OnInit {
  slides = [
    { title: 'shishaworldsamdanli', image: '/assets/images/stories/1.jpg' },
    { title: 'shisha_station_official', image: '/assets/images/stories/2.jpg' },
    { title: 'shisharia', image: '/assets/images/stories/3.jpg' },
    { title: 'shishazentrale', image: '/assets/images/stories/4.jpg' },
  ];

  constructor(public helper: HelperService, public adService: AdService) {}

  ngOnInit() {}
}
