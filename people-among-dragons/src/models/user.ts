export class User {
    _userId: number;
    _userEmail: string;
    _userName: string;
    _userSurname: string;
    _campaignRole: number;

    constructor(userId: number, userEmail: string, userName: string, userSurname: string, campaignRole: number){
        this._userId = userId;
        this._userEmail = userEmail;
        this._userName = userName;
        this._userSurname = userSurname;
        this._campaignRole = campaignRole
    }
}

