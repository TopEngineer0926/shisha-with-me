import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SettingsService {
    settings;

    constructor(private http: HttpClient) {}

    async getSettings() {
        if(this.settings){
            return this.settings;
        }
        try {
            const settings = await lastValueFrom(this.http.get('api/settings'));
            this.settings = settings;
            console.log(settings);
            return settings;
          } catch (error) {
            
          }
    }


    
}
