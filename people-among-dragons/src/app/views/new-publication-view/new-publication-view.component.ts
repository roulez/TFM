import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ConfirmationDialog } from 'src/app/confirmation-dialog/confirmation-dialog';
import { Publication } from 'src/models/publication';
import { WebApiService } from 'src/services/webapi-service';

@Component({
  selector: 'app-new-publication-view',
  templateUrl: './new-publication-view.component.html',
  styleUrls: ['./new-publication-view.component.css']
})
export class NewPublicationViewComponent implements OnInit {
  _isLoading: boolean = false;
  _currentUserId: number = 0;
  _newPublication: Publication = new Publication(0, "", "", "", "", "", new Date());
  _showTitleError: boolean = false;
  _showMessageError: boolean = false;
  _showNotAllowedScreen: boolean = false;
  
  constructor(private router: Router, public dialog: MatDialog, private webApiService: WebApiService) { }

  ngOnInit(): void {
    var loggedUserId = localStorage.getItem("LoggedUserId");
    this._currentUserId = loggedUserId != undefined ? parseFloat(loggedUserId as string) : 0;
    if(this._currentUserId === 0)
      this._showNotAllowedScreen = true;
  }

  createPublication(): void {
    this._showTitleError = false;
    this._showMessageError = false;
    if(this._newPublication._publicationTitle === "")
      this._showTitleError = true;
    else if(this._newPublication._publicationText === "")
      this._showMessageError = true;
    else{
      const dialogRef = this.dialog.open(ConfirmationDialog, {
        width: '20%',
        height: '20%',
        data: {
          confirmationText: "Are you sure you want to create this publication ?"
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result === true)
          this.createNewPublication();
      });
    }
  }

  async createNewPublication(): Promise<void> {
    this._isLoading = true;
    var publicationObservable = this.webApiService.createPublication(this._newPublication._publicationTitle, this._newPublication._publicationText, this._currentUserId);
    await lastValueFrom(publicationObservable);    
    this._isLoading = false;
    this.router.navigate(['/main']);
  }

}
