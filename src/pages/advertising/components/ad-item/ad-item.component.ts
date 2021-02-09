import { HelperService } from './../../../../common/services/helper.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ad-item',
  templateUrl: './ad-item.component.html',
  styleUrls: ['./ad-item.component.scss'],
})
export class AdItemComponent implements OnInit {
  @Input() ad: any;
  constructor(public helper: HelperService) {}

  ngOnInit() {}
}
