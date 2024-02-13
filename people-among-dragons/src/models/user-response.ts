export class UserResponse {
    Id: number;
    UserEmail: string;
    UserName: string;
    UserSurname: string;

    constructor(){
        this.Id = 0;
        this.UserEmail = "";  
        this.UserName = "";
        this.UserSurname = "";
    }
}