import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { get } from 'src/common/services/storage.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return from(this.handle(request, next));
  }

  async handle(request: HttpRequest<any>, next: HttpHandler) {
    const userData = await get('userData');
    if (request.url.includes(environment.apiUrl) && userData && userData.jwt) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${userData.jwt}`,
        },
      });
    }

    return next.handle(request).toPromise();
  }
}
