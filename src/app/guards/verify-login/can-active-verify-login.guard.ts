import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {ServiceLogin} from '../../services/login/service-login.service';
import {RoutersApp} from '../../util/RoutersApp';

@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class CanActiveVerifyLoginGuard implements CanActivate {

  constructor(private router: Router, private serviceLogin: ServiceLogin) { }

  // @ts-ignore
  canActivate(): boolean {
    if (!this.serviceLogin.isUserLoggedIn()) {
      this.navigate(RoutersApp.home);
      return false;
    }
    return true;
  }

  private navigate(router: string) {
    this.router.navigateByUrl(router);
  }

  // canActivateChild(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }
}
