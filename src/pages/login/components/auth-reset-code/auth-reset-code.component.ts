import { ToastrService } from 'ngx-toastr';
import { LoadingController } from '@ionic/angular';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as Sentry from '@sentry/angular';
import { AuthService } from 'src/common/auth/_services/auth.service';
@Component({
  selector: 'app-auth-reset-code',
  templateUrl: './auth-reset-code.component.html',
  styleUrls: ['./auth-reset-code.component.scss'],
})
export class AuthResetCodeComponent implements OnInit {
  email: string;

  @Output() passwordSend = new EventEmitter();

  constructor(
    private loadingCtrl: LoadingController,
    private auth: AuthService,
    private toast: ToastrService
  ) {}

  ngOnInit() {}

  async newPassword() {
    if (!!this.email) {
      const loading = await this.loadingCtrl.create({
        duration: 5000,
      });
      try {
        await loading.present();
        await this.auth.getPasswordCode(this.email);
        this.toast.success(
          'Sie erhalten ein Code zum Passwort ändern per E-Mail',
          '',
          {
            timeOut: 10000,
            progressBar: true,
          }
        );
        this.email = '';
        this.passwordSend.emit();
      } catch (error) {
        if (
          error.error &&
          error.error.message == 'Password already requested'
        ) {
          this.toast.error('Passwort bereits angefordert!');
        } else {
          this.toast.error('Fehler beim zurücksetzen!');
        }
        Sentry.captureException(error);
      } finally {
        await loading.dismiss();
      }
    } else {
      this.toast.error('Bitte geben Sie ihre E-Mail Adresse ein!');
    }
  }
}
