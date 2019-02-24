import {ThemePalette} from '@angular/material';
import {Router} from '@angular/router';
import {ServicePageHome} from './services/page-home/service-page-home.service';
import {ServiceLogin} from './services/login/service-login.service';

export enum UserType {
  STUDENT,
  TRAINER,
}

export interface User {
  name: string;
  id: number;
  type: UserType;
}

export interface ChipServices {
  name: string;
  color: ThemePalette;
  description: string;
  image: string;
}

export interface PackageRouterService {
  router: Router;
  servicePageHome: ServicePageHome;
  serviceLogin: ServiceLogin;
}
