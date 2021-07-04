import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-select-location',
  templateUrl: './select-location.page.html',
  styleUrls: ['./select-location.page.scss'],
})
export class SelectLocationPage implements OnInit {
  locations = [];
  searchInput = '';

  constructor(private modalCtrl: ModalController, private http: HttpClient) {}

  ngOnInit() {}

  async search() {
    const data: any = await this.http
      .get('api/locations', { params: { name_contains: this.searchInput } })
      .toPromise();
    console.log('layers', data);
    this.locations = data;
  }

  selectLoaction(location) {
    this.modalCtrl.dismiss(location);
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
