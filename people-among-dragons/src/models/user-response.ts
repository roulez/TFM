export class UserResponse {
    Id: number;
    UserEmail: string;
    UserName: string;
    UserSurname: string;
    CampaignRole: number;

    constructor(){
        this.Id = 0;
        this.UserEmail = "";  
        this.UserName = "";
        this.UserSurname = "";
        this.CampaignRole = -1;
    }
}