import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { ConfirmationDialog } from 'src/app/confirmation-dialog/confirmation-dialog';
import { Message } from 'src/models/message';
import { MessageResponse } from 'src/models/message-response';
import { User } from 'src/models/user';
import { UserResponse } from 'src/models/user-response';
import { WebApiService } from 'src/services/webapi-service';

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.css']
})
export class MessageViewComponent implements OnInit {
  _currentUserId: number = -1;
  _isLoading: boolean = false;
  _inboxElements: Array<Message> = [];
  _userMessages: Array<Message> = [];
  _selectedInbox: string = "inbox";
  _selectedMessageId: number = -1;
  _selectedMessage: Message = new Message(0, "", "", 0, "", "", "", 0, "", "", "", new Date());
  _isSendingMessage: boolean = false;
  _sendingMessage: Message = new Message(0, "", "", 0, "", "", "", 0, "", "", "", new Date());
  _receivingUserId: number = -1;
  _appUsers: Array<User> = [];
  _showTitleError: boolean = false;
  _showReceivingError: boolean = false;
  _showMessageError: boolean = false;
  _showNotAllowedScreen: boolean = false;

  constructor(public dialog: MatDialog, private webApiService: WebApiService) { }

  ngOnInit(): void {
    var loggedUserId = localStorage.getItem("LoggedUserId");
    this._currentUserId = loggedUserId != undefined ? parseFloat(loggedUserId as string) : 0;
    if(this._currentUserId != 0)
      this.loadData();
    else
      this._showNotAllowedScreen = true;
  }

  async loadData(): Promise<void> {
    this._isLoading = true;
    await this.loadMessagesData();
    await this.loadUsers();
    this._isLoading = false;
  }

  async loadMessagesData(): Promise<void> {
    this._isLoading = true;
    this._userMessages = [];
    this._inboxElements = [];

    var messagesObservable = this.webApiService.getUserMessages(this._currentUserId);
    var messagesResult = await lastValueFrom(messagesObservable);
    for(let message of messagesResult)
      this._userMessages.push(this.mapResponseToMessage(message));

    this.filterMessageData(this._selectedInbox);

    this._isLoading = false;
  }

  async loadUsers(): Promise<void> {
    var usersObservable = this.webApiService.getUsers();
    var usersResult = await lastValueFrom(usersObservable);
    for(let user of usersResult)
      this._appUsers.push(this.mapResponseToUser(user));
  }

  mapResponseToUser(userResponse: UserResponse) : User {
    var userItem = new User(0,"","", "", -1);
    userItem._userId = userResponse.Id;
    userItem._userEmail = userResponse.UserEmail;
    userItem._userName = userResponse.UserName;
    userItem._userSurname = userResponse.UserSurname;
    return userItem;
  }

  filterMessageData(selectedInbox: string): void {
    this._selectedInbox = selectedInbox;
    if(selectedInbox === "inbox")
      this._inboxElements = this._userMessages.filter(message => message._receivingUserId === this._currentUserId);
    else
      this._inboxElements = this._userMessages.filter(message => message._sendingUserId === this._currentUserId);
  }

  mapResponseToMessage(messageResponse: MessageResponse) : Message {
    var messageItem = new Message(0, "", "", 0, "", "", "", 0, "", "", "", new Date());
    messageItem._messageId = messageResponse.Id;
    messageItem._messageTitle = messageResponse.MessageTitle;
    messageItem._messageText = messageResponse.MessageText;
    messageItem._sendingUserId = messageResponse.SendingUserId;
    messageItem._sendingUserEmail = messageResponse.SendingUserEmail;
    messageItem._sendingUserName = messageResponse.SendingUserName;
    messageItem._sendingUserSurname = messageResponse.SendingUserSurname;
    messageItem._receivingUserId = messageResponse.ReceivingUserId;
    messageItem._receivingUserEmail = messageResponse.ReceivingUserEmail;
    messageItem._receivingUserName = messageResponse.ReceivingUserName;
    messageItem._receivingUserSurname = messageResponse.ReceivingUserSurname;
    messageItem._creationDate = new Date(messageResponse.CreationDate);
    return messageItem;
  }

  selectReceivingUser(receivingUserId: number): void{
    this._receivingUserId = receivingUserId;
  }

  openMessage(selectedMessage: Message): void {
    this._selectedMessageId = selectedMessage._messageId;
    this._selectedMessage = selectedMessage;
  }

  redactNewMessage(receivingUserId?: number, messageTitle?: string):void {
    this._showTitleError = false;
    this._showReceivingError = false;
    this._showMessageError = false;
    this._receivingUserId = receivingUserId != undefined ? receivingUserId : -1;
    var newMessageTitle = messageTitle != undefined ? "RE: " + messageTitle : "";
    this._sendingMessage = new Message(0, newMessageTitle, "", this._currentUserId, "", "", "", this._receivingUserId, "", "", "", new Date());
    this._isSendingMessage = true;
  }

  sendMessage(): void {
    this._showTitleError = false;
    this._showReceivingError = false;
    this._showMessageError = false;
    if(this._sendingMessage._messageTitle === "")
      this._showTitleError = true;
    else if(this._receivingUserId === -1)
      this._showReceivingError = true;
    else if(this._sendingMessage._messageText === "")
      this._showMessageError = true;
    else{
      const dialogRef = this.dialog.open(ConfirmationDialog, {
        width: '20%',
        height: '20%',
        data: {
          confirmationText: "Are you sure you want to send this message ?"
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result === true)
          this.createNewMessage();
      });
    }
  }

  async createNewMessage(): Promise<void>{
    this._isLoading = true;
    this._isSendingMessage = false;
    var messageObservable = this.webApiService.createUserMessage(this._sendingMessage._messageTitle, this._sendingMessage._messageText, this._sendingMessage._sendingUserId, this._receivingUserId);
    await lastValueFrom(messageObservable);
    await this.loadMessagesData();
    this._isLoading = false;
  }

  cancelNewMessage(): void {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '20%',
      height: '20%',
      data: {
        confirmationText: "Are you sure you want to discard this message ?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === true)
        this._isSendingMessage = false;
    });
  }

  formatMessageInbox(message: string, characterLimit: number): string {
    if(message.length < characterLimit)
      return message;
    else
      return message.substring(0, characterLimit) + "...";
  }

  formatDateAsString(date: Date): string {
    return this.formatDateNumber(date.getDate()) + "/" + this.formatDateNumber(date.getMonth() + 1) + "/" + this.formatDateNumber(date.getFullYear()) + " " + this.formatDateNumber(date.getHours()) + ":" + this.formatDateNumber(date.getMinutes());
  }

  formatDateNumber(dateNumber: number): string {
    return dateNumber < 10 ? "0" + dateNumber.toString() : dateNumber.toString();
  }

}
