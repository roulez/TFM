import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { LoginResult } from 'src/models/loginResult';
import { PublicationResponse } from 'src/models/publication-response';

@Injectable({
    providedIn: 'root',
  })
export class WebApiService {
    _httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})};

    constructor(private wepApiClient: HttpClient) {}

    isValidLoginData(userEmail: string, userPassword: string) {
        return this.wepApiClient.post(this.getWebApiUrl() + 'User/IsValidLogin?userEmail=' + userEmail + "&userPassword=" + userPassword , "", this._httpOptions).pipe(map(response => Object.assign(new LoginResult(), response)));
    }

    registerUser(userEmail: string, userPassword: string, userName: string, userSurname: string) {
        return this.wepApiClient.post(this.getWebApiUrl() + 'User/RegisterUser?userEmail=' + userEmail + "&userPassword=" + userPassword + "&userName=" + userName + "&userSurname=" + userSurname  ,
             "", this._httpOptions).pipe(map(response => response));
    }

    getPublications() {
        return this.wepApiClient.get(this.getWebApiUrl() + 'Publication/GetPublications', this._httpOptions).pipe(map(response => Object.assign(new Array<PublicationResponse>(), response)));
    }

    getWebApiUrl(): string {
        return "http://localhost:5159/api/";
    }
}