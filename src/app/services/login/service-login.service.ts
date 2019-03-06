import { Injectable } from '@angular/core';
import {User, UserType} from '../../interfaces';


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class ServiceLogin {
  public static readonly keyUserLocalStorage = 'currentUser';
  private keyUserLocalStorage = 'currentUser';
  private userLoggedIn;
  public userLogged: User;
  // private idUser='idUser';

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
    return localStorage.getItem(this.keyUserLocalStorage) ? true : false;
  }

  getTypeUser(): User {
    return JSON.parse(localStorage.getItem(this.keyUserLocalStorage)) as User;
  }

  closeSession() {
    this.userLoggedIn = false;
    this.userLogged = null;
  }
}
