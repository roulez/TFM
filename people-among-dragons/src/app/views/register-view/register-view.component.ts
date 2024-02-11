import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { WebApiService } from 'src/services/webapi-service';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.css']
})
export class RegisterViewComponent implements OnInit {

  _userName: string = "";
  _userSurname: string = "";
  _userEmail: string = "";
  _userPassword: string = "";
  _showNameError: boolean = false;
  _showSurnameError: boolean = false;
  _showEmailError: boolean = false;
  _showEmailExistsError: boolean = false;
  _showPasswordError: boolean = false;
  _showSuccessMesage: boolean = false;
  _isLoading: boolean = false;
  _nameControl: FormControl = new FormControl();
  _surnameControl: FormControl = new FormControl();
  _emailControl: FormControl = new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
  _passwordControl: FormControl = new FormControl();
  _loginForms = new FormGroup({ _emailControl: this._emailControl });

  constructor(private router: Router, private webApiService: WebApiService) { }

  ngOnInit(): void {
  }

  async registerAccount(): Promise<void>{
    this._showNameError = false;
    this._showSurnameError = false;
    this._showEmailError = false;
    this._showPasswordError = false;
    this._showEmailExistsError = false;
    this._showSuccessMesage = false;
    if(this._userName == "")
      this._showNameError = true;
    else if (this._userSurname == "")
      this._showSurnameError = true;
    else if(this._loginForms.invalid)
      this._showEmailError = true;
    else if(this._userPassword == "")
      this._showPasswordError = true;
    else{
      this._isLoading = true;
      var registerObservable = this.webApiService.registerUser(this._userEmail, this._userPassword, this._userName, this._userSurname);
      var registerResult = await lastValueFrom(registerObservable);
      this._isLoading = false;
      if(registerResult)
        this._showSuccessMesage = true;
      else
        this._showEmailExistsError = true;
    }
  }

  loginUser(): void {
    this.router.navigate(['']);
  }

}
