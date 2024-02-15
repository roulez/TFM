export class PublicationComment {
    _commentId: number;
    _commentText: string;
    _userName: string;
    _userEmail: string;
    _creationDate: Date;

    constructor(commentId: number, commentText: string, userName: string, userEmail: string, creationDate: Date){
        this._commentId = commentId;
        this._commentText = commentText;
        this._userName = userName;
        this._userEmail = userEmail;
        this._creationDate = creationDate;
    }
}