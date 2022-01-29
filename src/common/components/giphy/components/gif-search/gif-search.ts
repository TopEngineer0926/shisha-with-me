import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { GiphyService } from '../../services/giphy.service';

@Component({
  selector: 'gif-search',
  templateUrl: './gif-search.html',
  styleUrls: ['./gif-search.scss'],
  providers: [GiphyService]
})
export class GifSearchComponent {
  @Output() onSelect = new EventEmitter();
  @Output() onClose = new EventEmitter();

  gifs: any[] = [];
  isLoading = false;
  query = '';

  constructor(public GiphyService: GiphyService, private cdr: ChangeDetectorRef) {
    this.getTrending();
  }

  getTrending() {
    this.isLoading = true;

    this.GiphyService.trending().subscribe(res => {
      this.gifs = res.data;
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  searchGif(query: string) {
    if (query.length === 0) {return this.getTrending();}
    this.isLoading = true;

    this.GiphyService.search(query).subscribe(res => {
      this.gifs = res.data;
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  select(gif) {
    this.onSelect.emit(gif);
  }

  close() {
    this.query = '';
    this.onClose.emit();
  }
}
