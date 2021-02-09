import { AdService } from './../advertising/services/ad.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ad-saved',
  templateUrl: './ad-saved.page.html',
  styleUrls: ['./ad-saved.page.scss'],
})
export class AdSavedPage implements OnInit {
  constructor(public adService: AdService) {}

  ngOnInit() {}
}
