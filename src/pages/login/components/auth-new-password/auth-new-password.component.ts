import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import * as Sentry from '@sentry/angular';
import { AuthService } from 'src/common/auth/_services/auth.service';
@Component({
  selector: 'app-auth-new-password',
  templateUrl: './auth-new-password.component.html',
  styleUrls: ['./auth-new-password.component.scss'],
})
export class AuthNewPasswordComponent implements OnInit {
  public model: any = {
    confirmCode: '',
    email: '',
    password: '',
  };
  @Output() passwordReset = new EventEmitter();

  constructor(
    private loadingCtrl: LoadingController,
    private auth: AuthService,
    private toast: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const queryParams = this.route.snapshot.queryParams;
    if (queryParams.reset_password) {
      this.model.confirmCode = queryParams.code;
      this.model.email = queryParams.reset_password;
      // @ToDo: Focus password field when mail and code is already automatically entered
      // password field.focus();
    }
  }

  async passwordChange() {
    if (!!this.model.confirmCode && !!this.model.email && this.model.password) {
      const loading = await this.loadingCtrl.create({
        duration: 5000,
      });
      try {
        await loading.present();
        await this.auth.changePassword(
          this.model.confirmCode,
          this.model.email,
          this.model.password
        );
        this.toast.success('Ihr Passwort wurde erfolgreich geändert!', '', {
          timeOut: 10000,
          progressBar: true,
        });
        this.model.confirmCode = '';
        this.model.email = '';
        this.model.password = '';
        this.passwordReset.emit();

        await loading.dismiss();
      } catch (error) {
        Sentry.captureException(error);
        this.toast.error('Fehler beim ändern!');
      }
    } else {
      this.toast.error('Bitte füllen Sie alle Felder aus!');
    }
  }
}
