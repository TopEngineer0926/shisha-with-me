import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.page.html',
  styleUrls: ['./ad.page.scss'],
})
export class AdPage implements OnInit {
  bgImage: string =
    'https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500';

  constructor() {}

  ngOnInit() {}
}
