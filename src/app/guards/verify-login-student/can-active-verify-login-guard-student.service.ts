import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {ServiceLogin} from '../../services/login/service-login.service';
import {RoutersApp} from '../../util/RoutersApp';
import {UserType} from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class CanActiveVerifyLoginGuardStudent implements CanActivate {

  constructor(private router: Router, private serviceLogin: ServiceLogin) { }

  // @ts-ignore
  canActivate(): boolean {
    if (this.serviceLogin.isUserLoggedIn()) {
      const user = this.serviceLogin.getTypeUser();
      if (user.type === UserType.STUDENT) {
        return true;
      }
    }
    this.navigate(RoutersApp.home);
    return false;
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
