import { HelperService } from './../../../../common/services/helper.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdService } from '../../services/ad.service';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.page.html',
  styleUrls: ['./ad.page.scss'],
})
export class AdPage implements OnInit {
  ad: any;
  constructor(
    private route: ActivatedRoute,
    public adService: AdService,
    public helper: HelperService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.ad = this.adService.ads[id - 1];
  }
}
