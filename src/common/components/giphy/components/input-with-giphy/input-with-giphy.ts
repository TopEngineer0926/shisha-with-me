import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Injector,
  Output,
  ViewChild,
} from '@angular/core';
import { IonTextarea } from '@ionic/angular';

@Component({
  selector: 'input-with-giphy',
  templateUrl: './input-with-giphy.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./input-with-giphy.scss'],
})
export class InputWithGiphyComponent {
  typingMessage: string = '';
  showGiphy: boolean = false;
  @Output() onSubmit = new EventEmitter();
  @Output() onSizeChange = new EventEmitter();
  @ViewChild('messageInput', { static: false }) messageInput: IonTextarea;

  constructor() {}

  resize() {
    this.onSizeChange.emit();
  }

  toggleGiphy() {
    this.showGiphy = !this.showGiphy;
    this.onSizeChange.emit(this.showGiphy);
    if (!this.showGiphy && this.messageInput) {
      // this.messageInput.setFocus();
    }
  }

  sendText(text) {
    this.onSubmit.emit({
      type: 'text',
      message: text,
    });
    this.typingMessage = '';
    if (this.messageInput) {
      //this.messageInput.setFocus();
    }
  }

  sendGif(giphy) {
    this.onSubmit.emit({
      type: 'giphy',
      giphy: giphy,
    });
    this.typingMessage = '';
  }

  onInputSizeChange() {
    this.onSizeChange.emit(this.showGiphy);
  }
}
