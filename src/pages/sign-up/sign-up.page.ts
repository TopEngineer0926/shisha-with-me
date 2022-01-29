import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  currentTab: 'E-Mail' | 'Telefon' = 'E-Mail';
  constructor() { }

  ngOnInit() {
  }

  changeTab(ev) {
    this.currentTab = ev.detail.value;
  }
}
