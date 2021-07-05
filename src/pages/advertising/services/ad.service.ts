import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class AdService {
  constructor(private http: HttpClient) {}

  async load() {
    return this.http.get('api/categories').toPromise();
  }

  async loadOne(id: number) {
    return this.http.get('api/ads/' + id).toPromise();
  }
}
