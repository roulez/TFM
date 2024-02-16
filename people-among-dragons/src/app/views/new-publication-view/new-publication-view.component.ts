import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-publication-view',
  templateUrl: './new-publication-view.component.html',
  styleUrls: ['./new-publication-view.component.css']
})
export class NewPublicationViewComponent implements OnInit {
  _isLoading: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
