export class Publication {
    _publicationId: number;
    _publicationTitle: string;
    _publicationImage: string;
    _publicationText: string;
    _userName: string;
    _publicationDate: Date;

    constructor(publicationId:number, publicationTitle: string, publicationImage: string, publicationText: string, userName: string, publicationDate: Date){
        this._publicationId = publicationId;
        this._publicationTitle = publicationTitle;
        this._publicationImage = publicationImage;
        this._publicationText = publicationText;
        this._userName = userName;
        this._publicationDate = publicationDate;
    }
}