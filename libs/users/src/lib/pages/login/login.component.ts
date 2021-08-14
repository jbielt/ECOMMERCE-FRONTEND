import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {LocalstorageService} from "../../services/localstorage.service";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  loginFormGroup: FormGroup;
  isSubmitted = false;
  authError= false;
  authMessage = 'Email or Password are wrong';
  endSubscription$: Subject<any> = new Subject();


  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private localStorageService: LocalstorageService,
              private router: Router) { }

  ngOnInit(): void {
    this._initLoginForm();
  }
  ngOnDestroy() {
    this.endSubscription$.next();
    this.endSubscription$.complete();
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
    this.auth
      .login(loginData.email, loginData.password)
      .pipe(takeUntil(this.endSubscription$))
      .subscribe(
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
