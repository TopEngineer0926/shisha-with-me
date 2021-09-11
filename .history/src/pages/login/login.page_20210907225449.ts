import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonRouterOutlet,
  LoadingController,
  NavController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/common/auth/_services/auth.service';
import { UserService } from 'src/common/auth/_services/user.service';
import { AppService } from 'src/common/services/app.service';
import { Events } from 'src/common/services/event.service';
import { HelperService } from 'src/common/services/helper.service';
import { get, remove } from 'src/common/services/storage.service';
import { environment } from 'src/environments/environment';
import { AgeValidationPage } from '../age-validation/age-validation.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  currentTab: 'login' | 'register' = 'login';

  public model: {
    email: string;
    password: string;
  } = { email: '', password: '' };

  returnUrl: string;
  errorStr = '';
  submitted = false;

  @ViewChild('form') private form: NgForm;

  step = 1;
  agbChecked = false;
  apiUrl = environment.apiUrl;

  currentUser: any;

  showPassword: boolean = false;

  constructor(
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private routerOutlet: IonRouterOutlet,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private router: Router,
    public helper: HelperService,
    private translate: TranslateService,
    private events: Events,
    private authService: AuthService,
    private app: AppService,
    private userService: UserService,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    await remove('userData');
    const queryParams = this.route.snapshot.queryParams;

    this.returnUrl = queryParams.returnUrl || '/';

    if (queryParams.reset_password) {
      this.step = 3;
      this.model.email = queryParams.reset_password;
    }

    // this.events.subscribe('goto:login', () => {
    //   this.currentTab = 'login';
    // });

    await this.openAgeValidation();
  }

  async activateAccount() {
    const email = await get('emailAuth');
    await this.authService.showEmailConfirmAlert(email, true);
  }

  changeTab(ev) {
    this.currentTab = ev.detail.value;
  }

  async login() {
    await this.app.isLoading(true);

    if (!this.model.email || !this.model.password) {
      this.submitted = true;
      this.errorStr = 'fill_out_user_password';

      return;
    }

    this.submitted = true;

    if (this.form.valid) {
      try {
        const data: any = await this.authService.login(
          this.model.email,
          this.model.password
        );
        console.log('user', data);
        if (data.user) {
          (
            await this.toastCtrl.create({
              message: this.translate.instant('Login success'),
              duration: 4000,
            })
          ).present();
          this.navCtrl.navigateRoot(['/']);
        }
      } catch (value) {
        console.log(value);
        (
          await this.toastCtrl.create({
            message: this.translate.instant('Cannot login to your Account'),
            duration: 4000,
          })
        ).present();
      } finally {
        await this.app.isLoading(false);
      }
    }
  }

  async openAgeValidation() {
    const modal = await this.modalCtrl.create({
      component: AgeValidationPage,
      cssClass: 'transparent-background',
      swipeToClose: false,
      backdropDismiss: false,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {},
    });
    return await modal.present();
  }

  /*async login(
    type: 'facebook' | 'google' | 'apple' | 'phone' | 'snapchat' | 'instagram'
  ) {
    let message;
    switch (type) {
      case 'facebook':
        message = 'Login mit Facebook ...';
        break;
      case 'google':
        message = 'Login mit Google ...';
        break;
      case 'apple':
        message = 'Login mit Apple ...';
        break;
      case 'phone':
        message = 'Login mit deiner Telefonnummer ...';
        break;
      case 'snapchat':
        message = 'Login mit Snapchat ...';
        break;

      case 'instagram':
        message = 'Login mit Instagram ...';
        break;
    }
    const loading = await this.loadingCtrl.create({ message });
    loading.present();

    setTimeout(async () => {
      // await this.navCtrl.navigateRoot('/tabs/home');
      await this.navCtrl.navigateRoot('/onboarding');
      loading.dismiss();
    }, 2500);
  }*/
}
