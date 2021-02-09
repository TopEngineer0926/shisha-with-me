import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[parallax-header]',
  host: {
    '(ionScroll)': 'onContentScroll($event)',
    '(window:resize)': 'onWindowResize($event)',
  },
})
export class ParallaxHeaderDirective implements OnInit {
  header: any;
  headerHeight: any;
  translateAmt: any;
  scaleAmt: any;

  constructor(public element: ElementRef, public renderer: Renderer2) {}

  ngOnInit() {
    const content = this.element.nativeElement;
    if (content) {
      this.header = content.getElementsByClassName('header-image')[0];
      const mainContent = content.getElementsByClassName('main-content')[0];

      this.headerHeight = this.header.clientHeight;
      if (this.header) {
        this.renderer.setStyle(
          this.header,
          'webkitTransformOrigin',
          'center bottom'
        );
        this.renderer.setStyle(this.header, 'background-size', 'cover');
      }
      if (mainContent) {
        this.renderer.setStyle(mainContent, 'position', 'absolute');
      }
    }
  }

  onWindowResize(ev) {
    this.headerHeight = this.header.clientHeight;
  }

  onContentScroll(ev) {
    if (ev) {
      this.updateParallaxHeader(ev);
    }
  }

  updateParallaxHeader(ev) {
    if (ev.detail.scrollTop >= 0) {
      this.translateAmt = ev.detail.scrollTop / 2;
      this.scaleAmt = 1;
    } else {
      this.translateAmt = 0;
      this.scaleAmt = -ev.detail.scrollTop / this.headerHeight + 1;
    }
    this.renderer.setStyle(
      this.header,
      'webkitTransform',
      'translate3d(0,' +
        this.translateAmt +
        'px,0) scale(' +
        this.scaleAmt +
        ',' +
        this.scaleAmt +
        ')'
    );
  }
}
