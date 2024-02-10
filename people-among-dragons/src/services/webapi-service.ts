import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { LoginResult } from 'src/models/loginResult';

@Injectable({
    providedIn: 'root',
  })
export class WebApiService {
    _httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})};

    constructor(private wepApiClient: HttpClient) {}

    isValidLoginData(userEmail: string, userPassword: string) {
        return this.wepApiClient.post(this.getWebApiUrl() + 'User/IsValidLogin?userEmail=' + userEmail + "&userPassword=" + userPassword , "", this._httpOptions).pipe(map(response => Object.assign(new LoginResult(), response)));
    }

    getWebApiUrl(): string {
        return "http://localhost:5159/api/";
    }
}