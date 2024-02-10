export class LoginResult {
    IsEmailCorrect: boolean;
    IsPasswordCorrect: boolean;

    constructor(){
        this.IsEmailCorrect = false;
        this.IsPasswordCorrect = false;
    }
}