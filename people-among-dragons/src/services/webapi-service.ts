import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })
export class WebApiService {
    constructor(private wepApiClient: HttpClient) {}

    getData() {
        this.wepApiClient.get(this.getWebApiUrl() + 'WeatherForecast')
        .subscribe(
            data => {
                console.log(data);
            },
            error => {
                console.log(error);
            }
        );
    }

    getWebApiUrl(): string {
        return "http://localhost:5159/";
    }
}