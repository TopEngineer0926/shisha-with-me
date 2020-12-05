import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import * as MomentumSlider from 'momentum-slider';
@Component({
  selector: 'app-start-session',
  templateUrl: './start-session.page.html',
  styleUrls: ['./start-session.page.scss'],
})
export class StartSessionPage implements AfterViewInit {
  @ViewChild('slideContainer') slideContainer: ElementRef;
  // Variables to use later
  root = document.documentElement;
  container;
  button;
  counter: any;
  running = false;
  timer = null;
  seconds = 0;
  secondsInitial = 0;
  ms;

  constructor() {}

  ngAfterViewInit() {
    console.log(MomentumSlider, this.slideContainer.nativeElement);
    this.ms = new MomentumSlider({
      el: '.container',
      range: [1, 60],
      loop: 2,
      style: {
        transform: [{ scale: [0.4, 1] }],
        opacity: [0.3, 1],
      },
    });
    /*this.button.addEventListener('click', () => {
      if (this.running) {
        this.stop();
      } else {
        this.start();
      }
      this.running = !this.running;
    });*/
  }

  start() {
    this.ms.disable();
    this.seconds = this.ms.getCurrentIndex() + 1;
    this.counter.innerText = this.secondsInitial = this.seconds;
    this.root.style.setProperty('--progress', '0');
    this.container.classList.add('container--running');
    this.timer = setInterval(() => {
      // Update values
      this.counter.innerText = --this.seconds;
      const newValue =
        ((this.secondsInitial - this.seconds) / this.secondsInitial) * 100;
      this.root.style.setProperty('--progress', newValue.toString());
      if (!this.seconds) {
        stop();
        this.running = false;
      }
    }, 1000);
  }

  // Stop the countdown
  stop() {
    this.ms.enable();
    clearInterval(this.timer);
    this.root.style.setProperty('--progress', '100');
    this.container.classList.remove('container--running');
  }
}
