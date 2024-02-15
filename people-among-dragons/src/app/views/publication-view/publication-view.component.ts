import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Publication } from 'src/models/publication';
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

  formatDateAsString(date: Date): string {
    return this.formatDateNumber(date.getDate()) + "/" + this.formatDateNumber(date.getMonth() + 1) + "/" + this.formatDateNumber(date.getFullYear()) + " " + this.formatDateNumber(date.getHours()) + ":" + this.formatDateNumber(date.getMinutes());
  }

  formatDateNumber(dateNumber: number): string {
    return dateNumber < 10 ? "0" + dateNumber.toString() : dateNumber.toString();
  }
}
