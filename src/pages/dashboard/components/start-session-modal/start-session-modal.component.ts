import { Component, Input, OnInit } from '@angular/core';
import { Manufacturer } from 'src/common/types';

@Component({
  selector: 'app-start-session-modal',
  templateUrl: './start-session-modal.component.html',
  styleUrls: ['./start-session-modal.component.scss'],
})
export class StartSessionModalComponent implements OnInit {
  @Input() product: Manufacturer;
  @Input() type: string;

  constructor() { }

  ngOnInit() {
    console.log('A', this.product);
    console.log('B', this.type);
  }

}
