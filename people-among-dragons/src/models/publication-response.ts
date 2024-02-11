export class PublicationResponse {
    Id: number;
    PublicationTitle: string;
    PublicationImage: string;
    PublicationText: string;
    UserName: string;
    PublicationDate: Date;

    constructor(){
        this.Id = 0;
        this.PublicationTitle = "";
        this.PublicationImage = "";
        this.PublicationText = "";
        this.UserName = "";
        this.PublicationDate = new Date();
    }
}