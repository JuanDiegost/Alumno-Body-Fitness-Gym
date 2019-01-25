import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RoutersApp} from '../util/RoutersApp';
import {ServiceLogin} from '../services/login/service-login.service';

@Component({
  selector: 'app-student-root',
  templateUrl: './student-root.component.html',
  styleUrls: ['./student-root.component.css']
})
// @ts-ignore
export class StudentRootComponent implements OnInit {
  currentButtonPressedToolBar: HTMLButtonElement;

  constructor(private router: Router, private serviceLogin: ServiceLogin) { }

  ngOnInit() {
    if (!this.isScreenLow()) {
      this.printOfBlack(<HTMLButtonElement>document.getElementById('button-schedule'));
    } else {
      document.getElementById('div-menu-full').hidden = true;
    }
    this.router.navigateByUrl(RoutersApp.completeStudentSchedule);
  }

  printOfBlack(element: HTMLButtonElement) {
    if (this.currentButtonPressedToolBar) {
      this.currentButtonPressedToolBar.style.backgroundColor = '#353535';
    }
    this.currentButtonPressedToolBar = element;
    element.style.backgroundColor = 'black';
  }

  getRouterHome(): string {
    return RoutersApp.home;
  }

  getRouterSchedule(): string {
    return RoutersApp.schedule;
  }

  getRouterProgress(): string {
    return RoutersApp.progress;
  }

  getRouterMedicalHistory() {
    return RoutersApp.medicalHistory;
  }

  getRouterProfile() {
    return RoutersApp.profile;
  }

  getRouterLogin(): string {
    this.closeSession();
    return RoutersApp.home;
  }

  closeSession() {
    this.serviceLogin.closeSession();
  }

  isScreenLow(): boolean {
    return window.screen.width < 900;
  }

}
