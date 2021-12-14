import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  currentRoute = '';

  constructor(private router: Router) {
    router.events.pipe(
    filter(event => event instanceof NavigationEnd)
)
    .subscribe((event: NavigationEnd) => {
      this.currentRoute = event.url;
    });
  }

}
