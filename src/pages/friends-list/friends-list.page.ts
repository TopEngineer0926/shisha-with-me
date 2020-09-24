import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.page.html',
  styleUrls: ['./friends-list.page.scss'],
})
export class FriendsListPage implements OnInit {
  friends = [
    { name: 'Mathis Monn' },
    { name: 'Daniel Ehrhardt' },
    { name: 'Daniel Ehrhardt' },
    { name: 'Daniel Ehrhardt' },
    { name: 'Daniel Ehrhardt' },
    { name: 'Daniel Ehrhardt' },
    { name: 'Daniel Ehrhardt' },
    { name: 'Daniel Ehrhardt' },
    { name: 'Daniel Ehrhardt' },
    { name: 'Daniel Ehrhardt' },
    { name: 'Daniel Ehrhardt' },
    { name: 'Daniel Ehrhardt' },
    { name: 'Daniel Ehrhardt' },
    { name: 'Daniel Ehrhardt' },
    { name: 'Daniel Ehrhardt' },
    { name: 'Daniel Ehrhardt' },
    { name: 'Daniel Ehrhardt' },
    { name: 'Daniel Ehrhardt' },
    { name: 'Daniel Ehrhardt' },
    { name: 'Daniel Ehrhardt' },
  ];
  constructor() {}

  ngOnInit() {}

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
