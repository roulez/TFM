import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { Campaign } from 'src/models/campaign';
import { CampaignResponse } from 'src/models/campaign-response';
import { CampaignRole } from 'src/models/campaign-role';
import { User } from 'src/models/user';
import { UserResponse } from 'src/models/user-response';
import { WebApiService } from 'src/services/webapi-service';

@Component({
  selector: 'app-campaign-data',
  templateUrl: './campaign-data.dialog.html',
  styleUrls: ['./campaign-data.dialog.css']
})
export class CampaignDataDialog implements OnInit {
  _appUsers: Array<User> = [];
  _isLoading: boolean = false;
  _campaignId: number = 0;
  _campaignUsers: Array<User> = [];
  _showNameError: boolean = false;
  _showUserError: boolean = false;
  _showEmptyUserError: boolean = false;
  _currentCampaign: Campaign = new Campaign(0,"","");
  _campaignRoles: Array<CampaignRole> = [new CampaignRole(0, "Player"), new CampaignRole(1, "Dungeon Master")];

  constructor(
    @Inject(MAT_DIALOG_DATA) public campaignData: {campaignId: number, isEdit: boolean},
    public dialogRef: MatDialogRef<CampaignDataDialog>,
    private webApiService: WebApiService) { }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(): Promise<void> {
    this._isLoading = true;
    await this.loadUsers();
    if(this.campaignData.isEdit)
    {
      this._campaignId = this.campaignData.campaignId;
      await this.loadCampaignData();
      await this.loadCampaignUsers();
    }
    else {
      this._isLoading = true;
      var loggedUserId = localStorage.getItem("LoggedUserId");
      var currentUserId = loggedUserId != undefined ? parseFloat(loggedUserId as string) : 0;
      var currentUser = this._appUsers.find(user => user._userId === currentUserId)
      if(currentUser != undefined)
        this._campaignUsers.push(currentUser);
    }
    this._isLoading = false;
  }

  async loadCampaignData(): Promise<void> {
    var campaignObservable = this.webApiService.getCampaignData(this._campaignId);
    var campaignResult = await lastValueFrom(campaignObservable);
    this._currentCampaign = this.mapResponseToCampaign(campaignResult);
  }

  mapResponseToCampaign(campaignResponse: CampaignResponse) : Campaign {
    var campaignItem = new Campaign(0,"","");
    campaignItem._campaignId = campaignResponse.Id;
    campaignItem._campaignName = campaignResponse.CampaignName;
    campaignItem._campaignImage = campaignResponse.CampaignImage;
    return campaignItem;
  }

  async loadUsers(): Promise<void> {
    var usersObservable = this.webApiService.getUsers();
    var usersResult = await lastValueFrom(usersObservable);
    for(let user of usersResult) {
      user.CampaignRole = 0;
      this._appUsers.push(this.mapResponseToUser(user));
    }
  }

  async loadCampaignUsers(): Promise<void> {
    var campaignUsersObservable = this.webApiService.getUsersFromCampaign(this._campaignId);
    var campaignUsersResult = await lastValueFrom(campaignUsersObservable);
    for(let campaignUser of campaignUsersResult)
      this._campaignUsers.push(this.mapResponseToUser(campaignUser));
  }

  mapResponseToUser(userResponse: UserResponse) : User {
    var userItem = new User(0,"","", "", -1);
    userItem._userId = userResponse.Id;
    userItem._userEmail = userResponse.UserEmail;
    userItem._userName = userResponse.UserName;
    userItem._userSurname = userResponse.UserSurname;
    userItem._userSurname = userResponse.UserSurname;
    userItem._campaignRole = userResponse.CampaignRole;
    return userItem;
  }

  addUserToCampaign(newCampaignUser: User): void{
    this._showUserError = false;
    var userIndex = this._campaignUsers.findIndex(user => user._userId === newCampaignUser._userId);
    if(userIndex === -1)
      this._campaignUsers.push(newCampaignUser);
    else
      this._showUserError = true;
  }

  saveCampaign(): void{
    this._showNameError = false;
    this._showEmptyUserError = false;
    this._showUserError = false;
    if(this._currentCampaign._campaignName === "")
      this._showNameError = true;
    else if(this._campaignUsers.length == 0)
      this._showEmptyUserError = true;
    else{
      var campaignData = {campaign: this._currentCampaign, campaignUsers: this._campaignUsers}
      this.dialogRef.close(campaignData);
    }
  }

  deleteUser(userId: number): void {
    var userIndex = this._campaignUsers.findIndex(user => user._userId === userId);
    if(userIndex != -1)
      this._campaignUsers.splice(userIndex, 1);
  }

  closeDialog(): void{
    this.dialogRef.close();
  }

}
