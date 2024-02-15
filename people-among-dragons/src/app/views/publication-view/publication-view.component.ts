import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
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
  _publication: Publication = new Publication(0, "", "", "", "", "", new Date());
  _publicationComments: Array<PublicationComment> = [];
  _shownComments: Array<PublicationComment> = [];
  _currentCommentPage: number = 0;
  _commentPages: number = 0;

  constructor(private route: ActivatedRoute, private webApiService: WebApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this._publicationId = +params['id'];
      if(!isNaN(this._publicationId))
        this.loadData();
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
    var lastCommentPostion = this._currentCommentPage + 4;
    this._shownComments = this._publicationComments.slice(firstCommentPosition, lastCommentPostion);
  }

  formatDateAsString(date: Date): string {
    return this.formatDateNumber(date.getDate()) + "/" + this.formatDateNumber(date.getMonth() + 1) + "/" + this.formatDateNumber(date.getFullYear()) + " " + this.formatDateNumber(date.getHours()) + ":" + this.formatDateNumber(date.getMinutes());
  }

  formatDateNumber(dateNumber: number): string {
    return dateNumber < 10 ? "0" + dateNumber.toString() : dateNumber.toString();
  }
}
