import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  AlertController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/common/auth/_services/auth.service';
import { AppService } from 'src/common/services/app.service';
import { Events } from 'src/common/services/event.service';
import { HelperService } from 'src/common/services/helper.service';
import { set } from 'src/common/services/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public model: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  } = { email: '', password: '', firstName: '', lastName: '' };
  @ViewChild('form') private form: NgForm;

  step = 1;
  agbChecked = false;
  apiUrl = environment.apiUrl;
  errorStr = '';
  submitted = false;
  showPassword = false;

  constructor(
    private app: AppService,
    private authService: AuthService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private alertCtrl: AlertController,
    private events: Events,
    public helper: HelperService,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  async register() {
    await this.app.isLoading(true);

    if (!this.model.email || !this.model.password) {
      this.submitted = true;
      this.errorStr = 'fill_out_user_password';
      await this.app.isLoading(false);
      return;
    }

    this.submitted = true;

    if (this.form.valid) {
      try {
        const data: any = await this.authService.createUser(
          this.model.email,
          this.model.password
        );
        console.log('user', data);
        if (data.user) {
          (
            await this.toastCtrl.create({
              message: 'Erfolgreich!',
              translucent: true,
              position: 'top',
              duration: 4000,
            })
          ).present();
          this.navCtrl.navigateRoot(['/onboarding']);
        }

        //await this.router.navigateByUrl('/');
      } catch (value) {
        console.log(value);
        this.toastr.error('Error');
        this.errorStr = value.error?.message[0]?.messages[0]?.message;
      } finally {
        await this.app.isLoading(false);
      }
    }
  }
}
