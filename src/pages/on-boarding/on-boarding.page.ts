import { IonSlides, NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-on-boarding',
  templateUrl: './on-boarding.page.html',
  styleUrls: ['./on-boarding.page.scss'],
})
export class OnBoardingPage implements OnInit {
  @ViewChild('mySlider') slides: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  async goTo() {
    await this.navCtrl.navigateRoot('/tabs/home');
  }

  next() {
    this.slides.slideNext();
  }
  back() {
    this.slides.slidePrev();
  }
}
