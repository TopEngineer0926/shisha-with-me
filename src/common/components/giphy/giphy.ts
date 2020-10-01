import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GifSearchComponent } from './components/gif-search/gif-search';
import { InputWithGiphyComponent } from './components/input-with-giphy/input-with-giphy';
import { AutoResizeDirective } from './services/auto-resize';
import { NlbrPipe } from './services/nlbr.pipe';

@NgModule({
  declarations: [
    NlbrPipe,
    AutoResizeDirective,
    GifSearchComponent,
    InputWithGiphyComponent
  ],
  imports: [CommonModule, IonicModule, FormsModule, HttpClientModule],
  exports: [
    NlbrPipe,
    AutoResizeDirective,
    GifSearchComponent,
    InputWithGiphyComponent
  ]
})
export class GiphyModule {}
