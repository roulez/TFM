import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  _showPasswordError: boolean = false;
  _nameControl: FormControl = new FormControl();
  _surnameControl: FormControl = new FormControl();
  _emailControl: FormControl = new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
  _passwordControl: FormControl = new FormControl();
  _loginForms = new FormGroup({ _emailControl: this._emailControl });

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  registerAccount(): void{
    this._showNameError = false;
    this._showSurnameError = false;
    this._showEmailError = false;
    this._showPasswordError = false;
    if(this._userName == "")
      this._showNameError = true;
    else if (this._userSurname == "")
      this._showSurnameError = true;
    else if(this._loginForms.invalid)
      this._showEmailError = true;
    else if(this._userPassword.length < 8)
      this._showPasswordError = true;
    else
      this.router.navigate(['']); 
  }

}
