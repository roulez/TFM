import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Campaign } from 'src/models/campaign';
import { WebApiService } from 'src/services/webapi-service';
import { lastValueFrom } from 'rxjs';
import { CampaignResponse } from 'src/models/campaign-response';
import { CreatedCampaign } from 'src/models/created-campaign';
import { CampaignDataDialog } from './campaign-data/campaign-data.dialog';

@Component({
  selector: 'app-campaigns-view',
  templateUrl: './campaigns-view.component.html',
  styleUrls: ['./campaigns-view.component.css']
})
export class CampaignsViewComponent implements OnInit {
  _currentUserId: number = 0;
  _campaigns: Array<Campaign> = [];
  _isLoading: boolean = false;

  constructor(private router: Router, public dialog: MatDialog, private webApiService: WebApiService) { }

  ngOnInit(): void {
    var loggedUserId = localStorage.getItem("LoggedUserId");
    this._currentUserId = loggedUserId != undefined ? parseFloat(loggedUserId as string) : 0;
    if(this._currentUserId != 0)
      this.loadCampaigns();
  }

  async loadCampaigns(): Promise<void> {
    this._isLoading = true;
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

  openCampaign(): void{
    this.router.navigate(['/tabletop']);
  }

  createCampaign(): void{
    const dialogRef = this.dialog.open(CampaignDataDialog, {
      width: '20%',
      height: '80%',
      data: {
        campaignId: -1,
        isEdit: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      //If the user has created a campaign
      if(result != undefined)
        console.log(result);
    });
  }

}

@Component({
  selector: 'create-campaign-dialog',
  templateUrl: './create-campaign/create-campaign.dialog.html',
  styleUrls: ['./create-campaign/create-campaign.dialog.css']
})
export class CreateCampaignDialog {
  
  _campaignName: string = "";
  _showNameError: boolean = false;
  _isPrivateCampaign: boolean = false;
  _campaignPassword: string = "";
  _showPasswordError: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CreateCampaignDialog>
  ) {}

  createCampaign(): void {
    this._showNameError = false;
    this._showPasswordError = false;
    if(this._campaignName === "")
      this._showNameError = true;
    else if (this._isPrivateCampaign && this._campaignPassword === "")
      this._showPasswordError = true;
    else {
      var newCampaign = new CreatedCampaign(this._campaignName, this._isPrivateCampaign, this._campaignPassword);
      this.dialogRef.close(newCampaign);
    }
  }

  closeDialog(): void{
    this.dialogRef.close();
  }

}
