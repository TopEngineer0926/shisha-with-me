import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import {
  LaunchNavigator,
  LaunchNavigatorOptions,
} from '@ionic-native/launch-navigator/ngx';

@Component({
  selector: 'app-place',
  templateUrl: './place.page.html',
  styleUrls: ['./place.page.scss'],
})
export class PlacePage implements OnInit {
  @Input() place: google.maps.places.PlaceResult | any;

  constructor(
    private modalCtrl: ModalController,
    private launchNavigator: LaunchNavigator
  ) {}

  ngOnInit() {
    console.log(this.place);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  navigate() {
    let options: LaunchNavigatorOptions = {
      start: 'London, ON',
    };

    this.launchNavigator.navigate('Toronto, ON', options).then(
      (success) => console.log('Launched navigator'),
      (error) => console.log('Error launching navigator', error)
    );
  }
}
