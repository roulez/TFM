import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CampaignResponse } from 'src/models/campaign-response';
import { LoginResult } from 'src/models/loginResult';
import { MessageResponse } from 'src/models/message-response';
import { PublicationCommentResponse } from 'src/models/publication-comment-response';
import { PublicationResponse } from 'src/models/publication-response';
import { UserResponse } from 'src/models/user-response';

@Injectable({
    providedIn: 'root',
  })
export class WebApiService {
    _httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})};

    constructor(private wepApiClient: HttpClient) {}

    //User API methods

    isValidLoginData(userEmail: string, userPassword: string) {
        return this.wepApiClient.post(this.getWebApiUrl() + 'User/IsValidLogin?userEmail=' + userEmail + "&userPassword=" + userPassword , "", this._httpOptions).pipe(map(response => Object.assign(new LoginResult(), response)));
    }

    registerUser(userEmail: string, userPassword: string, userName: string, userSurname: string) {
        return this.wepApiClient.post(this.getWebApiUrl() + 'User/RegisterUser?userEmail=' + userEmail + "&userPassword=" + userPassword + "&userName=" + userName + "&userSurname=" + userSurname  ,
             "", this._httpOptions).pipe(map(response => response));
    }

    getUsers() {
        return this.wepApiClient.get(this.getWebApiUrl() + 'User/GetUsers', this._httpOptions).pipe(map(response => Object.assign(new Array<UserResponse>(), response)));
    }

    getUsersFromCampaign(campaignId: number) {
        return this.wepApiClient.get(this.getWebApiUrl() + 'User/GetUsersFromCampaign?campaignId=' + campaignId, this._httpOptions).pipe(map(response => Object.assign(new Array<UserResponse>(), response)));
    }

    //Publication API methods

    getPublications() {
        return this.wepApiClient.get(this.getWebApiUrl() + 'Publication/GetPublications', this._httpOptions).pipe(map(response => Object.assign(new Array<PublicationResponse>(), response)));
    }

    getPublicationData(publicationId: number) {
        return this.wepApiClient.get(this.getWebApiUrl() + 'Publication/GetPublicationData?publicationId=' + publicationId, this._httpOptions).pipe(map(response => Object.assign(new PublicationResponse(), response)));
    }

    //Publication Comments API methods

    getPublicationComments(publicationId: number) {
        return this.wepApiClient.get(this.getWebApiUrl() + 'PublicationComment/GetPublicationComments?publicationId=' + publicationId, this._httpOptions).pipe(map(response => Object.assign(new Array<PublicationCommentResponse>(), response)));
    }

    createPublicationComment(commentText: string, publicationId: number, userId: number) {
        return this.wepApiClient.post(this.getWebApiUrl() + 'PublicationComment/CreatePublicationComment?commentText=' + commentText + "&publicationId=" + publicationId + "&userId=" + userId, '', this._httpOptions).pipe(map(response => Object.assign(new Array<PublicationCommentResponse>(), response)));
    }

    //Campaign API methods

    getUserCampaigns(userId: number) {
        return this.wepApiClient.get(this.getWebApiUrl() + 'Campaign/GetUserCampaigns?userId=' + userId, this._httpOptions).pipe(map(response => Object.assign(new Array<CampaignResponse>(), response)));
    }

    getCampaignData(campaignId: number) {
        return this.wepApiClient.get(this.getWebApiUrl() + 'Campaign/GetCampaignData?campaignId=' + campaignId, this._httpOptions).pipe(map(response => Object.assign(new CampaignResponse(), response)));
    }

    createCampaign(campaignName: string, userId: number) {
        return this.wepApiClient.post(this.getWebApiUrl() + 'Campaign/CreateCampaign?campaignName=' + campaignName + "&userId=" + userId, this._httpOptions).pipe(map(response => parseInt(response.toString())));
    }

    addUserToCampaign(campaignId: number, userId: number) {
        return this.wepApiClient.post(this.getWebApiUrl() + 'Campaign/AddUserToCampaign?campaignId=' + campaignId + "&userId=" + userId, this._httpOptions).pipe(map(response => response));
    }
    
    updateCampaign(campaignId: number, campaignName: string) {
        return this.wepApiClient.put(this.getWebApiUrl() + 'Campaign/UpdateCampaign?campaignId=' + campaignId + "&campaignName=" + campaignName, this._httpOptions).pipe(map(response => response));
    }

    deleteCampaign(campaignId: number) {
        return this.wepApiClient.delete(this.getWebApiUrl() + 'Campaign/DeleteCampaign?campaignId=' + campaignId, this._httpOptions).pipe(map(response => response));
    }

    deleteUsersCampaign(campaignId: number) {
        return this.wepApiClient.delete(this.getWebApiUrl() + 'Campaign/DeleteUsersCampaign?campaignId=' + campaignId, this._httpOptions).pipe(map(response => response));
    }

    //Messages API methods

    getUserMessages(userId: number) {
        return this.wepApiClient.get(this.getWebApiUrl() + 'Message/GetUserMessages?userId=' + userId, this._httpOptions).pipe(map(response => Object.assign(new Array<MessageResponse>(), response)));
    }

    createUserMessage(messageTitle: string, messageText: string, sendingUserId: number, receivingUserId: number) {
        return this.wepApiClient.post(this.getWebApiUrl() + 'Message/CreateUserMessage?messageTitle=' + messageTitle + "&messageText=" + messageText + "&sendingUserId=" + sendingUserId + "&receivingUserId=" + receivingUserId, this._httpOptions).pipe(map(response => Object.assign(new Array<MessageResponse>(), response)));
    }

    //Common methods

    getWebApiUrl(): string {
        return "http://localhost:5159/api/";
    }
}