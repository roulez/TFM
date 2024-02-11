export class LoginResult {
    Id: number;
    IsEmailCorrect: boolean;
    IsPasswordCorrect: boolean;

    constructor(){
        this.Id = 0;
        this.IsEmailCorrect = false;
        this.IsPasswordCorrect = false;
    }
}