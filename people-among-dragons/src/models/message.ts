export class Message {
    _messageId: number;
    _messageTitle: string;
    _messageText: string;
    _sendingUserId: number;
    _sendingUserName: string;
    _sendingUserSurname: string;
    _sendingUserEmail: string;
    _receivingUserId: number;
    _receivingUserName: string;
    _receivingUserSurname: string;
    _receivingUserEmail: string;
    _creationDate: Date;

    constructor(messageId: number, messageTitle: string, messageText: string, sendingUserId: number, sendingUserName: string, sendingUserSurname: string, sendingUserEmail: string, receivingUserId: number, receivingUserName: string, receivingUserSurname: string, receivingUserEmail: string, creationDate: Date){
        this._messageId = messageId;
        this._messageTitle = messageTitle;
        this._messageText = messageText;
        this._sendingUserId = sendingUserId;
        this._sendingUserName = sendingUserName;
        this._sendingUserSurname = sendingUserSurname;
        this._sendingUserEmail = sendingUserEmail;
        this._receivingUserId = receivingUserId;
        this._receivingUserName = receivingUserName;
        this._receivingUserSurname = receivingUserSurname;
        this._receivingUserEmail = receivingUserEmail;
        this._creationDate = creationDate;
    }
}