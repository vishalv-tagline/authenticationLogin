import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  public userName: any;
  public imageUrl: any;
  public userDetails: any = {};
  public providers!: any;
  constructor(
    private socialAuthService: SocialAuthService,
    private router: Router
  ) {
    this.userDetails.userName = localStorage.getItem('user_name');
    this.userDetails.imageUrl = localStorage.getItem('photoUrl') ? localStorage.getItem('photoUrl') : 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg';
    this.userDetails.email = localStorage.getItem('email');
    this.userDetails.provider = localStorage.getItem('provider');
    this.providers = localStorage.getItem('provider') ? localStorage.getItem('provider') : 'Email & Password';
    console.log('this.userDetails :>> ', this.userDetails);
  }

  public onLogout() {
    this.socialAuthService.signOut();
    localStorage.clear();
    this.router.navigate(['']);
  }

}
