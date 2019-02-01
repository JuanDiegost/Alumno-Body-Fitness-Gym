import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HomeComponent} from '../../home/home.component';
import {PackageRouterService, User, UserType} from '../../interfaces';

import {RoutersApp} from '../../util/RoutersApp';

@Component({
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.css']
})
// @ts-ignore
export class DialogLoginComponent implements OnInit {

  // @ts-ignore
  constructor(public dialogRef: MatDialogRef<HomeComponent>, @Inject(MAT_DIALOG_DATA) private data: PackageRouterService) {}

  ngOnInit() {
  }

  loginUser(event: Event) {
    const elementUserName = (<HTMLInputElement>document.getElementById('userName'));
    const elementPassword = (<HTMLInputElement>document.getElementById('password'));
    const username: string = elementUserName.value;
    const password: string = elementPassword.value;
    event.preventDefault();

    this.data.servicePageHome.login(username, password).subscribe(
      res => {
        console.log(res);
        if (res[0]["idAlumno"]!=undefined) {
          const user: User = {name: username, type: UserType.STUDENT,id:res[0]["idAlumno"]};
          this.data.serviceLogin.setUserLoggedIn(user);
          localStorage.setItem('idAlumno', res[0]["dniAlumno"]);
        } else {
          alert('Usuario o contraseña incorrecta');
          elementPassword.value = '';
          return;
        }
      },
      error => {
        console.error(error);
        alert('No podemos conectarnos con el servidor en este momento, por favor comprueba tu conexion a internet o intenta mas tarde.');
        elementPassword.value = '';
      },
      () => this.navigate(RoutersApp.student)
    );
  }

  private navigate(router: string) {
    this.data.router.navigateByUrl(router);
  }
}
