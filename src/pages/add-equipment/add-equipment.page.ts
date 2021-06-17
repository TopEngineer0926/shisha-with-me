import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.page.html',
  styleUrls: ['./add-equipment.page.scss'],
})
export class AddEquipmentPage implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }
}
