export class CampaignMessage {
    _messageId: number;
    _campaignId: number;
    _userId: number;
    _userName: string;
    _messageText: string;
    _isPrivate: boolean;
    _creationDate: Date;

    constructor(messageId: number, campaignId: number, userId: number, userName: string, messageText: string, isPrivate: boolean,  creationDate: Date){
        this._messageId = messageId;
        this._campaignId = campaignId;
        this._userId = userId;
        this._userName = userName;
        this._messageText = messageText;
        this._isPrivate = isPrivate;
        this._creationDate = creationDate;
    }
}