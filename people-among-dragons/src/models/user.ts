export class User {
    _userId: number;
    _userEmail: string;
    _userName: string;
    _userSurname: string;

    constructor(userId: number, userEmail: string, userName: string, userSurname: string){
        this._userId = userId;
        this._userEmail = userEmail;
        this._userName = userName;
        this._userSurname = userSurname;
    }
}