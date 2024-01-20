import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-campaigns-view',
  templateUrl: './campaigns-view.component.html',
  styleUrls: ['./campaigns-view.component.css']
})
export class CampaignsViewComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  createCampaign(): void{
    const dialogRef = this.dialog.open(CreateCampaignDialog, {
      width: '20%',
      height: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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

  constructor(
    public dialogRef: MatDialogRef<CreateCampaignDialog>
  ) {}

  createCampaign(): void{
  }

  closeDialog(): void{
    this.dialogRef.close();
  }

}
