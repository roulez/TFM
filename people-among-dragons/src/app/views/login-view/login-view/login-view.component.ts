import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  _emailControl: FormControl = new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
  _loginForms = new FormGroup({ _emailControl: this._emailControl });

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  checkLoginData(): void{
    this._showEmailError = false;
    this._showPasswordError = false;
    //if(this._loginForms.invalid)
    //  this._showEmailError = true;
    if(this._userPassword.length < 8)
      this._showPasswordError = true;
    else
      this.router.navigate(['/formulario']);  
  }

}
