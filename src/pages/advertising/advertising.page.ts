import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advertising',
  templateUrl: './advertising.page.html',
  styleUrls: ['./advertising.page.scss'],
})
export class AdvertisingPage implements OnInit {
  slides = [
    { title: 'Bar 1' },
    { title: 'Bar 2' },
    { title: 'Bar 3' },
    { title: 'Bar 4' },
    { title: 'Bar 5' },
    { title: 'Bar 6' },
    { title: 'Bar 7' },
  ];
  constructor() {}

  ngOnInit() {}
}
