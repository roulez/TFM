export class MessageResponse {
    Id: number;
    MessageTitle: string;
    MessageText: string;
    SendingUserId: number;
    SendingUserName: string;
    SendingUserSurname: string;
    SendingUserEmail: string;
    ReceivingUserId: number;
    ReceivingUserName: string;
    ReceivingUserSurname: string;
    ReceivingUserEmail: string;
    CreationDate: Date;

    constructor(){
        this.Id = 0;
        this.MessageTitle = "";
        this.MessageText = "";
        this.SendingUserId = 0;
        this.SendingUserName = "";
        this.SendingUserSurname = "";
        this.SendingUserEmail = "";
        this.ReceivingUserId = 0;
        this.ReceivingUserName = "";
        this.ReceivingUserSurname = "";
        this.ReceivingUserEmail = "";
        this.CreationDate = new Date();
    }
}