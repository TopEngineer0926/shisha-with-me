import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { from, map, Observable } from 'rxjs';
import { remove } from 'src/common/services/storage.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private navCtrl: NavController) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let newReq = req.clone();
    if (req.url.startsWith('api/')) {
      const api = `${environment.apiUrl}/${req.url.replace('api/', '')}`;
      newReq = req.clone({ url: api });
    }
    return next.handle(newReq).pipe(
      map((e: HttpEvent<any>) => {
        async () => {
          if (e instanceof HttpResponse) {
            if (e.status === 401) {
              await remove('userData');
              this.navCtrl.navigateRoot(['/login']);
            }
          }
        };
        return e;
      })
    );
  }
}
