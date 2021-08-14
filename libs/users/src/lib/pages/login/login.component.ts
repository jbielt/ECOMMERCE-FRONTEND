import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {LocalstorageService} from "../../services/localstorage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  isSubmitted = false;
  authError= false;
  authMessage = 'Email or Password are wrong';

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private localStorageService: LocalstorageService,
              private router: Router) { }

  ngOnInit(): void {
    this._initLoginForm();

  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    const loginData = {
      email: this.loginForm.email.value,
      password: this.loginForm.password.value
    }
    if(this.loginFormGroup.invalid){
      return;
    }
    this.auth.login(loginData.email, loginData.password).subscribe(
  (user) => {
        this.authError = false;
        this.localStorageService.setToken(user.token);
        this.router.navigate(['/']);
    },
  (error: HttpErrorResponse) => {
        this.authError = true;
        console.log(error)
        if(error.status !== 400){
          this.authMessage = 'Error in the Server, please try again later!';
        }
      });
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }



}
