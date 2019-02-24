import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {ServiceLogin} from '../../services/login/service-login.service';
import {UserType} from '../../interfaces';
import {RoutersApp} from '../../util/RoutersApp';

@Injectable({
  providedIn: 'root'
})
export class CanActiveVerifyLoginTrainer implements CanActivate {

  constructor(private router: Router, private serviceLogin: ServiceLogin) { }

  // @ts-ignore
  canActivate(): boolean {
    if (this.serviceLogin.isUserLoggedIn()) {
      const user = this.serviceLogin.getTypeUser();
      if (user.type === UserType.TRAINER) {
        console.log('TRUE');
        return true;
      }
    }
    console.log('TRAINER');
    this.navigate(RoutersApp.home);
    return false;
  }

  private navigate(router: string) {
    this.router.navigateByUrl(router);
  }
}
