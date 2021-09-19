import { IonSlides, NavController, ToastController } from '@ionic/angular';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { set } from 'src/common/services/storage.service';
import { AuthService } from 'src/common/auth/_services/auth.service';
import { HttpClient } from '@angular/common/http';
import { HelperService } from 'src/common/services/helper.service';

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
  user;
  constructor(
    private navCtrl: NavController,
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private toastCtrl: ToastController,
    public helper: HelperService
  ) {}

  async ngOnInit() {
    console.log(this.authService.user);
    this.ionicForm = this.formBuilder.group({
      qrCode: [true, [Validators.required]],
      username: [true, [Validators.required]],
      telefonnumber: [null],
      instagran: [null],
    });

    await this.loadUser();
  }

  async loadUser() {
    const data = await this.http
      .get('api/users/' + this.authService?.user.id)
      .toPromise();
    this.user = data;
    console.log('this.user', this.user);

    await this.authService.updateUser();
    this.cdr.detectChanges();
  }

  async goTo() {
    await set('loggedIn', true);
    await this.navCtrl.navigateRoot('/tabs/home');
  }

  slideChange() {
    this.slides.getActiveIndex().then((res) => {
      this.sliderNum = res;
    });
  }

  async next() {
    try {
      const user: any = await this.http
        .put('api/users/' + this.user.id, this.user)
        .toPromise();
      await this.loadUser();
      this.slides.slideNext();
    } catch (error) {
      (
        await this.toastCtrl.create({
          message: 'Benutzername bereits vorhanden',
          translucent: true,
          position: 'top',
          duration: 4000,
        })
      ).present();
    }
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
