import { HelperService } from 'src/common/services/helper.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-addiction-information',
  templateUrl: './addiction-information.page.html',
  styleUrls: ['./addiction-information.page.scss'],
})
export class AddictionInformationPage implements OnInit {
  constructor(
    public helper: HelperService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }
}
