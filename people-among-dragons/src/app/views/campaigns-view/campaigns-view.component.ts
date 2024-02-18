import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Campaign } from 'src/models/campaign';
import { WebApiService } from 'src/services/webapi-service';
import { lastValueFrom } from 'rxjs';
import { CampaignResponse } from 'src/models/campaign-response';
import { CampaignDataDialog } from './campaign-data/campaign-data.dialog';
import { User } from 'src/models/user';
import { ConfirmationDialog } from 'src/app/confirmation-dialog/confirmation-dialog';

@Component({
  selector: 'app-campaigns-view',
  templateUrl: './campaigns-view.component.html',
  styleUrls: ['./campaigns-view.component.css']
})
export class CampaignsViewComponent implements OnInit {
  _currentUserId: number = 0;
  _campaigns: Array<Campaign> = [];
  _isLoading: boolean = false;
  _showNotAllowedScreen: boolean = false;

  constructor(private router: Router, public dialog: MatDialog, private webApiService: WebApiService) { }

  ngOnInit(): void {
    var loggedUserId = localStorage.getItem("LoggedUserId");
    this._currentUserId = loggedUserId != undefined ? parseFloat(loggedUserId as string) : 0;
    if(this._currentUserId != 0)
      this.loadCampaigns();
    else
      this._showNotAllowedScreen = true;
  }

  async loadCampaigns(): Promise<void> {
    this._isLoading = true;
    this._campaigns = [];
    var campaignsObservable = this.webApiService.getUserCampaigns(this._currentUserId);
    var campaignsResult = await lastValueFrom(campaignsObservable);
    for(let campaign of campaignsResult)
      this._campaigns.push(this.mapResponseToCampaign(campaign));
    this._isLoading = false;
  }

  mapResponseToCampaign(campaignResponse: CampaignResponse) : Campaign {
    var campaignItem = new Campaign(0,"","");
    campaignItem._campaignId = campaignResponse.Id;
    campaignItem._campaignName = campaignResponse.CampaignName;
    campaignItem._campaignImage = campaignResponse.CampaignImage;
    return campaignItem;
  }

  openCampaign(campaignId: number): void{
    this.router.navigate(['/tabletop/' + campaignId]);
  }

  createCampaign(): void {
    const dialogRef = this.dialog.open(CampaignDataDialog, {
      width: '30%',
      height: '90%',
      data: {
        campaignId: -1,
        isEdit: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      //If the user has created a campaign
      if(result != undefined){
        var campaign: Campaign = result.campaign;
        var campaignUsers: Array<User> = result.campaignUsers;
        this.createNewCampaign(campaign, campaignUsers);
      }
    });
  }

  async createNewCampaign(campaign: Campaign, campaignUsers: Array<User>): Promise<void> {
    this._isLoading = true;

    var campaignObservable = this.webApiService.createCampaign(campaign._campaignName, this._currentUserId);
    var campaignId = await lastValueFrom(campaignObservable);

    for(let campaignUser of campaignUsers){
      var campaignUserObservable = this.webApiService.addUserToCampaign(campaignId, campaignUser._userId, campaignUser._campaignRole);
      await lastValueFrom(campaignUserObservable);
    }
    await this.loadCampaigns();
    this._isLoading = false;
  }

  editCampaign(campaignId: number): void {
    const dialogRef = this.dialog.open(CampaignDataDialog, {
      width: '30%',
      height: '90%',
      data: {
        campaignId: campaignId,
        isEdit: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      //If the user has created a campaign
      if(result != undefined){
        var campaign: Campaign = result.campaign;
        var campaignUsers: Array<User> = result.campaignUsers;
        this.updateCampaign(campaign, campaignUsers);
      }
    });
  }

  async updateCampaign(campaign: Campaign, campaignUsers: Array<User>): Promise<void> {
    this._isLoading = true;
    var campaignObservable = this.webApiService.updateCampaign(campaign._campaignId, campaign._campaignName);
    await lastValueFrom(campaignObservable);
    var campaignUsersObservable = this.webApiService.deleteUsersCampaign(campaign._campaignId);
    await lastValueFrom(campaignUsersObservable);

    for(let campaignUser of campaignUsers){
      var campaignUserObservable = this.webApiService.addUserToCampaign(campaign._campaignId, campaignUser._userId, campaignUser._campaignRole);
      await lastValueFrom(campaignUserObservable);
    }
    await this.loadCampaigns();
    this._isLoading = false;
  }

  deleteCampaign(campaignId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '20%',
      height: '20%',
      data: {
        confirmationText: "Are you sure you want to delete this campaign ? This action cannot be undone."
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === true)
        this.asyncDeleteCampaign(campaignId);
    });
  }

  async asyncDeleteCampaign(campaignId: number): Promise<void> {
    this._isLoading = true;
    var campaignObservable = this.webApiService.deleteCampaign(campaignId);
    await lastValueFrom(campaignObservable);
    this.loadCampaigns();
    this._isLoading = false;
  }
}
