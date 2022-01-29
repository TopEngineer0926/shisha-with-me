import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEventType,
} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, retry } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  public upload(formData) {
    return this.http.post<any>(`api/upload`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  uploadFile(formData) {
    return new Promise((resolve) => {
      if (!formData) {
        return;
      }

      // file.inProgress = true;
      this.upload(formData)
        .pipe(
          map((event) => {
            switch (event.type) {
              case HttpEventType.UploadProgress:
                // file.progress = Math.round((event.loaded * 100) / event.total);
                break;
              case HttpEventType.Response:
                return event;
            }
          }),
          catchError((error: HttpErrorResponse) =>
            // file.inProgress = false;
             of(`upload failed.`)
          )
        )
        .subscribe((event: any) => {
          if (typeof event === 'object') {
            resolve(event);
            return event;
          }
        });
    });
  }
}
