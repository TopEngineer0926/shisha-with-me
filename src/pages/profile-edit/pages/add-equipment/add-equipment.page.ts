import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/common/auth/_services/auth.service';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.page.html',
  styleUrls: ['./add-equipment.page.scss'],
})
export class AddEquipmentPage implements OnInit {
  key = 'Shisha';
  inputValue = '';

  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }

  async add() {
    const user = this.authService.user;
    if (!user.setups) {
      user.setups = [];
    }

    console.log(this.inputValue);

    user.setups.push({ key: this.key, value: this.inputValue });

    await this.http
      .put('api/users/' + user.id, { setups: user.setups })
      .toPromise();

    this.authService.updateUser();
    this.modalCtrl.dismiss();
  }
}
