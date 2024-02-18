import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ConfirmationDialog } from 'src/app/confirmation-dialog/confirmation-dialog';
import { Publication } from 'src/models/publication';
import { PublicationComment } from 'src/models/publication-comment';
import { PublicationCommentResponse } from 'src/models/publication-comment-response';
import { PublicationResponse } from 'src/models/publication-response';
import { WebApiService } from 'src/services/webapi-service';

@Component({
  selector: 'app-publication-view',
  templateUrl: './publication-view.component.html',
  styleUrls: ['./publication-view.component.css']
})
export class PublicationViewComponent implements OnInit {
  _isLoading: boolean = false;
  _publicationId: number = -1;
  _currentUserId: number = 0;
  _publication: Publication = new Publication(0, "", "", "", "", "", new Date());
  _newComment: PublicationComment = new PublicationComment(0, "", "", "", new Date());
  _publicationComments: Array<PublicationComment> = [];
  _shownComments: Array<PublicationComment> = [];
  _currentCommentPage: number = 0;
  _commentPages: number = 0;
  _showCommentTextError: boolean = false;
  _showNotAllowedScreen: boolean = false;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private webApiService: WebApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this._publicationId = +params['id'];
      var loggedUserId = localStorage.getItem("LoggedUserId");
      this._currentUserId = loggedUserId != undefined ? parseFloat(loggedUserId as string) : 0;
      if(this._currentUserId != 0 && !isNaN(this._publicationId))
        this.loadData();
      else
        this._showNotAllowedScreen = true;
   });
  }

  async loadData(): Promise<void> {
    this._isLoading = true;
    await this.loadPublicationData();
    await this.loadPublicationCommentsData();
    this._isLoading = false;
  }

  async loadPublicationData(): Promise<void> {
    var publicationObservable = this.webApiService.getPublicationData(this._publicationId);
    var publicationsResult = await lastValueFrom(publicationObservable);
    this._publication = this.mapResponseToPublication(publicationsResult);
  }

  mapResponseToPublication(publicationResponse: PublicationResponse) : Publication {
    var publicationItem = new Publication(0,"","","", "","",new Date());
    publicationItem._publicationId = publicationResponse.Id;
    publicationItem._publicationTitle = publicationResponse.PublicationTitle;
    publicationItem._publicationImage = publicationResponse.PublicationImage;
    publicationItem._publicationText = publicationResponse.PublicationText;
    publicationItem._userName = publicationResponse.UserName;
    publicationItem._userEmail = publicationResponse.UserEmail;
    publicationItem._publicationDate = new Date(publicationResponse.PublicationDate);
    return publicationItem;
  }

  async loadPublicationCommentsData(): Promise<void> {
    this._publicationComments = [];
    this._shownComments = [];
    var publicationCommentsObservable = this.webApiService.getPublicationComments(this._publicationId);
    var publicationsCommentsResult = await lastValueFrom(publicationCommentsObservable);
    for(let publicationComment of publicationsCommentsResult)
      this._publicationComments.push(this.mapResponseToPublicationComment(publicationComment));
    var commentPages = Math.ceil(this._publicationComments.length / 5);
    this._commentPages = commentPages != 0 ? commentPages : 1;
    this.paginateCommentSection();
  }

  mapResponseToPublicationComment(publicationCommentResponse: PublicationCommentResponse) : PublicationComment {
    var publicationCommentItem = new PublicationComment(0, "", "", "", new Date);
    publicationCommentItem._commentId = publicationCommentResponse.Id;
    publicationCommentItem._commentText = publicationCommentResponse.CommentText;
    publicationCommentItem._userName = publicationCommentResponse.UserName;
    publicationCommentItem._userEmail = publicationCommentResponse.UserEmail;
    publicationCommentItem._creationDate = new Date(publicationCommentResponse.CreationDate);
    return publicationCommentItem;
  }

  sendComment() {
    this._showCommentTextError = false;
    if(this._newComment._commentText === "")
      this._showCommentTextError = true;
    else{
      const dialogRef = this.dialog.open(ConfirmationDialog, {
        width: '20%',
        height: '20%',
        data: {
          confirmationText: "Are you sure you want to send this message as a comment ?"
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result === true)
          this.createNewComment();
      });
    }
  }

  async createNewComment(): Promise<void> {
    this._isLoading = true;
    var publicationCommentsObservable = this.webApiService.createPublicationComment(this._newComment._commentText, this._publicationId, this._currentUserId);
    await lastValueFrom(publicationCommentsObservable);
    this._newComment = new PublicationComment(0, "", "", "", new Date());
    await this.loadPublicationCommentsData();
    this._isLoading = false;
  }

  nextPage(): void {
    if(this._currentCommentPage < (this._commentPages - 1)){
      this._currentCommentPage++;
      this.paginateCommentSection();
    }
  }

  previousPage(): void {
    if(this._currentCommentPage > 0){
      this._currentCommentPage--;
      this.paginateCommentSection();
    }
  }

  paginateCommentSection(): void {
    var firstCommentPosition = this._currentCommentPage * 5;
    var lastCommentPostion = firstCommentPosition + 5;
    this._shownComments = this._publicationComments.slice(firstCommentPosition, lastCommentPostion);
  }

  formatDateAsString(date: Date): string {
    return this.formatDateNumber(date.getDate()) + "/" + this.formatDateNumber(date.getMonth() + 1) + "/" + this.formatDateNumber(date.getFullYear()) + " " + this.formatDateNumber(date.getHours()) + ":" + this.formatDateNumber(date.getMinutes());
  }

  formatDateNumber(dateNumber: number): string {
    return dateNumber < 10 ? "0" + dateNumber.toString() : dateNumber.toString();
  }
}
