import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebApiService } from 'src/services/webapi-service';

@Component({
  selector: 'app-publication-view',
  templateUrl: './publication-view.component.html',
  styleUrls: ['./publication-view.component.css']
})
export class PublicationViewComponent implements OnInit {
  _isLoading: boolean = false;
  _publicationId: number = -1;

  constructor(private route: ActivatedRoute, private webApiService: WebApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this._publicationId = +params['id'];
   });
  }

}
