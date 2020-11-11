import { HelperService } from 'src/common/services/helper.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-addiction-counseling',
  templateUrl: './addiction-counseling.page.html',
  styleUrls: ['./addiction-counseling.page.scss'],
})
export class AddictionCounselingPage implements OnInit {
  constructor(
    public helper: HelperService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }
}
