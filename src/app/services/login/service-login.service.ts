import { Injectable } from '@angular/core';
import {User} from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class ServiceLogin {
  private userLoggedIn;
  public userLogged: User;
  private keyUserLocalStorage = 'currentUser';

  constructor() {
    this.userLoggedIn = false;
  }

  setUserLoggedIn(user: User) {
    this.userLoggedIn = true;
    this.userLogged = user;
    localStorage.setItem(this.keyUserLocalStorage, JSON.stringify(user));
  }

  getUserLoggedIn() {
    return JSON.parse(localStorage.getItem(this.keyUserLocalStorage));
  }

  isUserLoggedIn(): boolean {
    return this.userLoggedIn;
  }

  closeSession() {
    this.userLoggedIn = false;
    this.userLogged = null;
    localStorage.removeItem(this.keyUserLocalStorage);
  }
}
