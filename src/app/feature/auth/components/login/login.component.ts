import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { catchError, throwError } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm!: FormGroup;
  public isSubmited: boolean = false;
  public user: any

  constructor(
    private fb: FormBuilder,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.validationLogin();
    this.googleAuth();
  }



  validationLogin() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required]
    })
  }

  get frmControl() {
    return this.loginForm.controls;
  }

  public onHandleLogin() {
    if (this.loginForm.invalid) {
      this.isSubmited = true
      console.log('Invalid Form Details!!');
    }
    else {
      console.log('this.loginForm.value :>> ', this.loginForm.value);
      let data = {
        ...this.loginForm.value
      }
      this.authenticationService.checkLogin(data).subscribe((res: any) => {
        console.log('res :>> ', res);
        localStorage.setItem('user_name', res.name);
        localStorage.setItem('email', res.email);
        localStorage.setItem('password', res.password);

        this.router.navigate(['/admin']);
      })
      this.isSubmited = false;
    }
  }

  public googleAuth() {
    this.socialAuthService.authState.pipe(catchError(e => { return throwError("ERROR", e) })).subscribe((user: SocialUser) => {
      this.user = user;
      console.log('this.user :>> ', this.user);
      localStorage.setItem('photoUrl', this.user?.photoUrl);
      localStorage.setItem('user_name', this.user?.name);
      localStorage.setItem('email', this.user?.email)
      localStorage.setItem('provider', this.user?.provider);
      this.router.navigate(['/admin']);
    });
    // window.location.href = "https://accounts.google.com/gsi/select?client_id=641756807112-gob5mojpv6g227kus78hqg8a9la9o9eo.apps.googleusercontent.com&auto_select=false&ux_mode=popup&ui_mode=card&as=3pO53yS7Iey3XMTfCOAlQw&channel_id=8a9b76cd52bde7accdfb0af38c20fd3e8eab5ef2f3083e65b739b0ee54132928&origin=http%3A%2F%2Flocalhost%3A4200";
    // window.location.href = "https://accounts.google.com/gsi/select?client_id=641756807112-gob5mojpv6g227kus78hqg8a9la9o9eo.apps.googleusercontent.com&auto_select=false&ux_mode=popup&ui_mode=card&as=%2B%2BUf4fACMkHsxoCTjTMGfQ&channel_id=871b4a3043a19a275512d120638361f3bf0b0b7311805fe11aaee8d829954d96&origin=http%3A%2F%2Flocalhost%3A4200";

    // this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res: any) => {
    //   console.log('res :>> ', res);
    //   this.router.navigate(['/admin']);
    // }).catch((err: any) => {
    //   console.log('error :>> ', err);
    // })
  }

  // public googleAuth() {

  // }

  public onFacebookAuth() {
    console.log('123 :>> ', 123);
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((res: any) => {
      if (res) {
        console.log('res :>> ', res);
        localStorage.setItem('photoUrl', res?.response?.picture?.data?.url);
        localStorage.setItem('user_name', res?.name);
        localStorage.setItem('email', res?.email)
        this.router.navigate(['/admin']);
      }
    }).catch((err: any) => {
      if (err) {
        console.log('err :>> ', err);
      }
    })
  }
}
