export class TabletopMessages {
    _message: string;
    _isPrivate: boolean;
    _userName: string;

    constructor(message: string, isPrivate: boolean, userName: string){
        this._message = message;
        this._isPrivate = isPrivate;
        this._userName = userName;
    }
}