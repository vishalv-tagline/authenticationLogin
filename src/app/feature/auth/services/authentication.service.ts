import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData: any = [
    {
      name: 'Admin',
      email: 'admin@gmail.com',
      role: 'admin',
      password: '123456'
    },
    {
      name: 'User',
      email: 'user@gmail.com',
      role: 'user',
      password: '123456'
    }
  ]

  constructor() { }

  public checkLogin(data: { email: string, password: string }): Observable<any> {
    return of(
      this.userData.find(
        (user: any) => {
          return user.email === data.email && user.password === data.password
        }
      )
    )
  }
}
