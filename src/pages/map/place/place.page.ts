import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HelperService } from './../../../common/services/helper.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.page.html',
  styleUrls: ['./place.page.scss'],
})
export class PlacePage implements OnInit {
  @Input() place: google.maps.places.PlaceResult | any;
  @Input() placeId: string | number;

  location;

  constructor(
    private modalCtrl: ModalController,
    public helper: HelperService,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    console.log(this.place);
    if (this.placeId) {
      const location: any = await this.http
        .get('api/locations/' + this.placeId)
        .toPromise();
      console.log('user', location);
      this.location = location;
    } else {
      setTimeout(() => {
        this.modalCtrl.dismiss();
      }, 500);
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  navigate() {
    /*let options: LaunchNavigatorOptions = {
      start: 'London, ON',
    };

    this.launchNavigator.navigate('Toronto, ON', options).then(
      (success) => console.log('Launched navigator'),
      (error) => console.log('Error launching navigator', error)
    );*/
    console.log('this.place', this.place);
    this.helper.openLink(
      `https://www.google.com/maps/place/?q=${this.location?.name} ${this.location?.location?.address}`
    );
  }
}
