import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Campaign } from 'src/models/campaign';
import { CampaignResponse } from 'src/models/campaign-response';
import { TabletopMessages } from 'src/models/tabletop-messages';
import { WebApiService } from 'src/services/webapi-service';

@Component({
  selector: 'app-tabletop-view',
  templateUrl: './tabletop-view.component.html',
  styleUrls: ['./tabletop-view.component.css']
})
export class TabletopViewComponent implements OnInit {
  _numberOfRolls: number = 1;
  _campaignName: string = "Test";
  _campaignId: number = -1;
  _sendPrivateMessage: boolean = false;
  _chatMessages: Array<TabletopMessages> = [];
  _userMessage: string = "";
  _currentCampaign: Campaign = new Campaign(0,"","");
  _isLoading: boolean = false;

  constructor(private route: ActivatedRoute, private webApiService: WebApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this._campaignId = +params['id'];
      this.loadData();
   });
  }

  async loadData(): Promise<void>{
    this._isLoading = true;
    await this.loadCampaignData();
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

  rollDice(diceSides: number): void {
    if(this._numberOfRolls > 0) {
      var rollResults = new Array<number>();
      for (let i = 0; i < this._numberOfRolls; i++)
        rollResults.push(this.generateRandomNumber(1, diceSides));

      var result = "You rolled a " + this.getRollResultsAsString(rollResults);
      var resultMessage = new TabletopMessages(result,this._sendPrivateMessage, "TestUser");
      this._chatMessages.push(resultMessage);
    }   
  }

  generateRandomNumber(minimunNumber: number, maximunNumber: number): number {
    return Math.floor(Math.random() * (maximunNumber - minimunNumber + 1) + minimunNumber);
  }

  sendMessage(): void {
    if(this._userMessage !== "") {
      var chatMessage = new TabletopMessages(this._userMessage, this._sendPrivateMessage, "TestUser");
      this._userMessage = "";
      this._chatMessages.push(chatMessage);
    }     
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

}
