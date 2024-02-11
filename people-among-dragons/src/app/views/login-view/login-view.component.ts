import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { WebApiService } from 'src/services/webapi-service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {

  _userEmail: string = "";
  _userPassword: string = "";
  _showEmailError: boolean = false;
  _showPasswordError: boolean = false;
  _isLoading: boolean = false;
  _emailControl: FormControl = new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
  _passwordControl: FormControl = new FormControl();
  _loginForms = new FormGroup({ _emailControl: this._emailControl });

  constructor(private router: Router, private webApiService: WebApiService) { }

  ngOnInit(): void {
  }

  async checkLoginData(): Promise<void>{
    this._showEmailError = false;
    this._showPasswordError = false;   

    if(this._loginForms.invalid)
      this._showEmailError = true;
    else if(this._userPassword === "")
      this._showPasswordError = true;
    else{
      this._isLoading = true;
      var loginObservable = this.webApiService.isValidLoginData(this._userEmail, this._userPassword);
      var loginResult = await lastValueFrom(loginObservable);
      this._isLoading = false;
      if(!loginResult.IsEmailCorrect)
        this._showEmailError = true;
      else if(!loginResult.IsPasswordCorrect)
        this._showPasswordError = true;
      else{
        localStorage.setItem("LoggedUserId", loginResult.Id.toString());
        this.router.navigate(['/main']);
      }
    }
  }

  registerAccount(): void{
    this.router.navigate(['/register']);
  }

}
