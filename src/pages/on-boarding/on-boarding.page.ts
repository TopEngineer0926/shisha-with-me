import { IonSlides, NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-on-boarding',
  templateUrl: './on-boarding.page.html',
  styleUrls: ['./on-boarding.page.scss'],
})
export class OnBoardingPage implements OnInit {
  @ViewChild('mySlider') slides: IonSlides;
  ionicForm: FormGroup;
  isSubmitted = false;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    allowTouchMove: false,
  };
  sliderNum = 0;
  constructor(
    private navCtrl: NavController,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      qrCode: [null, [Validators.required]],
      benutzername: [null, [Validators.required]],
      telefonnumber: [null],
      instagran: [null],
    });
  }

  async goTo() {
    await this.navCtrl.navigateRoot('/tabs/home');
  }

  slideChange() {
    this.slides.getActiveIndex().then((res) => {
      this.sliderNum = res;
    });
  }

  next() {
    this.slides.slideNext();
  }
  back() {
    this.slides.slidePrev();
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log(this.ionicForm.value);
      this.next();
    }
  }
}