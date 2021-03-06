import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let newReq = req.clone();
    if (req.url.startsWith('api/')) {
      const api = `${environment.apiUrl}/${req.url.replace('api/', '')}`;
      newReq = req.clone({ url: api });
    }
    return next.handle(newReq);
  }
}
