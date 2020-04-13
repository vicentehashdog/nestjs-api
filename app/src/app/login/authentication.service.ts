import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  private currentTokenSubject: BehaviorSubject<string>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentTokenSubject = new BehaviorSubject<string>(localStorage.getItem('token'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get currentTokenValue(): string {
    return this.currentTokenSubject.value;
  }

  login(email: string) {
    return this.http.post<any>(`http://localhost:3000/users/authenticate`, { email })
      .pipe(map(response => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        const { token, ...user } = response;
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('token', token);
        this.currentUserSubject.next(user);
        this.currentTokenSubject.next(token);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }
}