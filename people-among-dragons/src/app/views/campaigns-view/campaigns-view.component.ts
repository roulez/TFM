import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Campaign } from 'src/models/campaign';

@Component({
  selector: 'app-campaigns-view',
  templateUrl: './campaigns-view.component.html',
  styleUrls: ['./campaigns-view.component.css']
})
export class CampaignsViewComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openCampaign(): void{
    this.router.navigate(['/tabletop']);
  }

  createCampaign(): void{
    const dialogRef = this.dialog.open(CreateCampaignDialog, {
      width: '20%',
      height: '80%'
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
      var newCampaign = new Campaign(this._campaignName, this._isPrivateCampaign, this._campaignPassword);
      this.dialogRef.close(newCampaign);
    }
  }

  closeDialog(): void{
    this.dialogRef.close();
  }

}
