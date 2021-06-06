import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
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
  showPassword: boolean = false;

  constructor(
    private app: AppService,
    private authService: AuthService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private alertCtrl: AlertController,
    private events: Events,
    public helper: HelperService
  ) {}

  ngOnInit() {}

  async register() {
    await this.app.isLoading(true);

    if (
      !this.model.firstName ||
      !this.model.lastName ||
      !this.model.email ||
      !this.model.password
    ) {
      this.submitted = true;
      this.errorStr = 'fill_out_user_password';

      return;
    }

    this.submitted = true;

    if (this.form.valid) {
      try {
        const user: any = await this.authService.createUser(
          this.model.firstName,
          this.model.lastName,
          this.model.email,
          this.model.password
        );
        console.log('user', user);
        if (user.data) {
          await this.app.isLoading(false);

          await set('emailAuth', user.data.createUser.email);

          await this.authService.showEmailConfirmAlert(
            user.data.createUser.email
          );

          const alert = await this.alertCtrl.create({
            header: 'Account aktiviert!',
            translucent: true,
            backdropDismiss: false,
            message:
              'Ihr Account ist nun aktiviert. Bitte melden Sie sich nun an.',
            buttons: [
              {
                text: 'Anmelden',
                handler: async () => {
                  this.events.publish('goto:login');
                },
              },
            ],
          });
          await alert.present();
        }

        if (user.errors) {
          console.log(user.errors);
          if (user.errors[0].extensions.exception.status == 409) {
            this.toastr.warning(this.translate.instant('E-Mail already taken'));
          }
        }

        //await this.router.navigateByUrl('/');
      } catch (value) {
        console.log(value);
        this.toastr.error('Error');
        this.errorStr = value.error.error;
      } finally {
        await this.app.isLoading(false);
      }
    }
  }
}
