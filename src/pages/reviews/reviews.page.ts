import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/common/auth/_services/auth.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {
  data;
  sessions;

  constructor(private http: HttpClient, private authService: AuthService) {}

  async ngOnInit() {
    await this.load();
  }

  async load() {
    const data: any = await this.http
      .get('api/sessions', {
        params: { start_user_eq: this.authService.user.id },
      })
      .toPromise();
    console.log('layers', data);
    this.sessions = data;
  }

  async doRefresh(event) {
    await this.load();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }
}
