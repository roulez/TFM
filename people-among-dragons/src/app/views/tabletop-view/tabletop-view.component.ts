import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Campaign } from 'src/models/campaign';
import { CampaignMessage } from 'src/models/campaign-message';
import { CampaignMessageResponse } from 'src/models/campaign-message-response';
import { CampaignResponse } from 'src/models/campaign-response';
import { User } from 'src/models/user';
import { UserResponse } from 'src/models/user-response';
import { WebApiService } from 'src/services/webapi-service';

@Component({
  selector: 'app-tabletop-view',
  templateUrl: './tabletop-view.component.html',
  styleUrls: ['./tabletop-view.component.css']
})
export class TabletopViewComponent implements OnInit {
  _numberOfRolls: number = 1;
  _campaignId: number = -1;
  _sendPrivateMessage: boolean = false;
  _chatMessages: Array<CampaignMessage> = [];
  _userMessage: string = "";
  _currentCampaign: Campaign = new Campaign(0,"","");
  _currentUserId: number = 0;
  _currentUser: User = new User(0, "","","", -1);
  _isLoading: boolean = false;
  _showNotAllowedScreen: boolean = false;

  constructor(private route: ActivatedRoute, private webApiService: WebApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this._campaignId = +params['id'];
      var loggedUserId = localStorage.getItem("LoggedUserId");
      this._currentUserId = loggedUserId != undefined ? parseFloat(loggedUserId as string) : 0;
      if(this._currentUserId != 0 && !isNaN(this._campaignId))
        this.loadData();
      else
        this._showNotAllowedScreen = true;
   });
  }

  async loadData(): Promise<void>{
    this._isLoading = true;
    var partOfTheCampaignObservable = this.webApiService.isUserPartOfTheCampaign(this._campaignId, this._currentUserId);
    var partOfTheCampaignResult = await lastValueFrom(partOfTheCampaignObservable);
    if(partOfTheCampaignResult){
      await this.loadCampaignData();
      await this.loadUserCampaignData();
      await this.loadCampaignMessages();
    }
    else
      this._showNotAllowedScreen = true;
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

  async loadUserCampaignData(): Promise<void> {
    var userCampaignObservable = this.webApiService.getUserCampaignData(this._campaignId, this._currentUserId);
    var userCampaignResult = await lastValueFrom(userCampaignObservable);
    this._currentUser = this.mapResponseToUser(userCampaignResult);
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

  async loadCampaignMessages(): Promise<void> {
    this._chatMessages = [];
    var campaignMessagesObservable = this.webApiService.getCampaignMessages(this._campaignId);
    var campaignMessagesResult = await lastValueFrom(campaignMessagesObservable);
    for(let campaignMessage of campaignMessagesResult)
      this._chatMessages.push(this.mapResponseToCampaignMessage(campaignMessage));
  }

  mapResponseToCampaignMessage(campaignMessageResponse: CampaignMessageResponse) : CampaignMessage {
    var campaignMessageItem = new CampaignMessage(0, 0, 0, "", "", false, new Date());
    campaignMessageItem._messageId = campaignMessageResponse.Id;
    campaignMessageItem._campaignId = campaignMessageResponse.CampaignId;
    campaignMessageItem._userId = campaignMessageResponse.UserId;
    campaignMessageItem._userName = campaignMessageResponse.UserName;
    campaignMessageItem._messageText = campaignMessageResponse.MessageText;
    campaignMessageItem._isPrivate = campaignMessageResponse.IsPrivate;
    campaignMessageItem._creationDate = new Date(campaignMessageResponse.CreationDate);
    return campaignMessageItem;
  }

  rollDice(diceSides: number): void {
    if(this._numberOfRolls > 0) {
      var rollResults = new Array<number>();
      for (let i = 0; i < this._numberOfRolls; i++)
        rollResults.push(this.generateRandomNumber(1, diceSides));

      var result = "You rolled a " + this.getRollResultsAsString(rollResults);
      var resultMessage = new CampaignMessage(0, this._campaignId, this._currentUserId, "" , result, this._sendPrivateMessage, new Date());
      this.createNewMessage(resultMessage);
    }   
  }

  generateRandomNumber(minimunNumber: number, maximunNumber: number): number {
    return Math.floor(Math.random() * (maximunNumber - minimunNumber + 1) + minimunNumber);
  }

  sendMessage(): void {
    if(this._userMessage !== "") {
      var chatMessage = new CampaignMessage(0, this._campaignId, this._currentUserId, "" , this._userMessage, this._sendPrivateMessage, new Date());
      this._userMessage = "";
      this.createNewMessage(chatMessage);
    }     
  }

  async createNewMessage(newMessage: CampaignMessage): Promise<void> {
    this._isLoading = true;
    var campaignMessageObservable = this.webApiService.createCampaignMessage(newMessage._campaignId, newMessage._userId, newMessage._messageText, newMessage._isPrivate);
    await lastValueFrom(campaignMessageObservable);
    await this.loadCampaignMessages();
    this._isLoading = false;
  }

  getRollResultsAsString(rollResults: Array<number>): string {
    var rollText = "(";
    for (let i = 0; i < rollResults.length; i++) {
      if(i !== 0)
        rollText += ",";
      rollText += rollResults[i];
    }
      
    rollText += ")";
    return rollText;
  }
  
  checkIfUserCanCheckMessage(chatMessage: CampaignMessage): boolean {
    if(!chatMessage._isPrivate)
      return true;
    else if(chatMessage._userId == this._currentUser._userId || this._currentUser._campaignRole === 1)
      return true;
    else
      return false;
  }

}
