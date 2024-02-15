export class PublicationCommentResponse {
    Id: number;
    CommentText: string;
    UserName: string;
    UserEmail: string;
    CreationDate: Date;

    constructor(){
        this.Id = 0;
        this.CommentText = "";
        this.UserName = "";
        this.UserEmail = "";
        this.CreationDate = new Date();
    }
}