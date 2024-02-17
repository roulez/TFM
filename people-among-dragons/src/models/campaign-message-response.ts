export class CampaignMessageResponse {
    Id: number;
    CampaignId: number;
    UserId: number;
    UserName: string;
    MessageText: string;
    IsPrivate: boolean;
    CreationDate: Date;

    constructor(){
        this.Id = 0;
        this.CampaignId = 0;
        this.UserId = 0;
        this.UserName = "";
        this.MessageText = "";
        this.IsPrivate = false;
        this.CreationDate = new Date();
    }
}