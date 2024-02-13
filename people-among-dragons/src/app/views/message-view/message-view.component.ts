import { Component, OnInit } from '@angular/core';
import { Message } from 'src/models/message';
import { WebApiService } from 'src/services/webapi-service';

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.css']
})
export class MessageViewComponent implements OnInit {
  _isLoading: boolean = false;
  _inboxElements: Array<Message> = [];
  _userMessages: Array<Message> = [];
  _selectedInbox: string = "inbox";
  _selectedMessageId: number = -1;

  constructor(private webApiService: WebApiService) { }

  ngOnInit(): void {
  }

}
