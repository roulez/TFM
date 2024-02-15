import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Publication } from 'src/models/publication';
import { PublicationResponse } from 'src/models/publication-response';
import { WebApiService } from 'src/services/webapi-service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {
  _publications: Array<Publication> = [];
  _isLoading: boolean = false;

  constructor(private router: Router, private webApiService: WebApiService) { }

  ngOnInit(): void {
    this.loadPublications();
  }

  async loadPublications(): Promise<void> {
    this._isLoading = true;
    var publicationsObservable = this.webApiService.getPublications();
    var publicationsResult = await lastValueFrom(publicationsObservable);
    for(let publication of publicationsResult)
      this._publications.push(this.mapResponseToPublication(publication));
    this._isLoading = false;
  }

  mapResponseToPublication(publicationResponse: PublicationResponse) : Publication {
    var publicationItem = new Publication(0,"","","", "","",new Date());
    publicationItem._publicationId = publicationResponse.Id;
    publicationItem._publicationTitle = publicationResponse.PublicationTitle;
    publicationItem._publicationImage = publicationResponse.PublicationImage;
    publicationItem._publicationText = publicationResponse.PublicationText;
    publicationItem._userName = publicationResponse.UserName;
    publicationItem._publicationDate = new Date(publicationResponse.PublicationDate);
    return publicationItem;
  }

  openPublication(publiationId:number): void {
    this.router.navigate(['/publication/' + publiationId]);
  }

  formatDateAsString(date: Date): string {
    return this.formatDateNumber(date.getDate()) + "/" + this.formatDateNumber(date.getMonth() + 1) + "/" + this.formatDateNumber(date.getFullYear()) + " " + this.formatDateNumber(date.getHours()) + ":" + this.formatDateNumber(date.getMinutes());
  }

  formatDateNumber(dateNumber: number): string {
    return dateNumber < 10 ? "0" + dateNumber.toString() : dateNumber.toString();
  }

  formatPublicationMessage(message: string, characterLimit: number): string {
    if(message.length < characterLimit)
      return message;
    else
      return message.substring(0, characterLimit) + "...";
  }

}
