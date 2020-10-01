import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_KEY = 'dc6zaTOxFJmzC';
const ENDPOINT = 'https://api.giphy.com/v1/gifs';

@Injectable()
export class GiphyService {
  constructor(private http: HttpClient) {}

  search(query: string): Observable<any> {
    return this.http.get(`${ENDPOINT}/search`, {
      params: {
        api_key: API_KEY,
        q: query
      }
    });
  }

  trending(): Observable<any> {
    return this.http.get(`${ENDPOINT}/trending`, {
      params: {
        api_key: API_KEY
      }
    });
  }
}
