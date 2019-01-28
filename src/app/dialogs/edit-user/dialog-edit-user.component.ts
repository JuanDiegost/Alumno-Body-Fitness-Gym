import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Inject, LOCALE_ID } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { ServiceUserService } from "../../services/services-user/service-user.service";
import { DatePipe } from "@angular/common";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-dialog-edit-user",
  templateUrl: "./dialog-edit-user.component.html",
  styleUrls: ["./dialog-edit-user.component.css"]
})
export class DialogEditUserComponent implements OnInit {
  signupFormModalName = new FormControl("", Validators.required);
  signupFormModalEmail = new FormControl("", Validators.email);
  signupFormModalPassword = new FormControl("", Validators.required);
  signupFormModalDni = new FormControl("", Validators.required);
  signupFormModalGenero = new FormControl("", Validators.required);
  signupFormModalTelefono = new FormControl("", Validators.required);
  signupFormModalDate = new FormControl("", Validators.required);

  BirthDate: Date;
  idAlumno;
  dniAlumno;
  nombreAlumno;
  telefonoAlumno;
  emailAlumno;
  usuarioAlumno;
  genero;
  datePipeEn: DatePipe = new DatePipe("en-US");

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: ServiceUserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.BirthDate = new Date(
      this.replaceAt(this.data.fechaNacimiento, 10, " ")
    );
    this.idAlumno = this.data.idAlumno;
    this.nombreAlumno = this.data.nombreAlumno;
    this.telefonoAlumno = this.data.telefonoAlumno;
    this.emailAlumno = this.data.emailAlumno;
    this.usuarioAlumno = this.data.usuarioAlumno;
    this.genero = this.data.genero;
    this.dniAlumno = this.data.dniAlumno;

    this.displayContentPersonal();
  }

  displayContentUser() {
    const divMain = document.getElementById("Usuario");
    const divMain2 = document.getElementById("Personal");
    const divMain3 = document.getElementById("btnUser");
    const divMain4 = document.getElementById("btnPerson");
    // @ts-ignore
    divMain.style = "display: block;";
    // @ts-ignore
    divMain2.style = "display: none;";
    // @ts-ignore
    divMain3.style = " visibility: visible;";
    // @ts-ignore
    divMain4.style = " visibility: hidden;";
  }

  displayContentPersonal() {
    const divMain = document.getElementById("Usuario");
    const divMain2 = document.getElementById("Personal");
    const divMain3 = document.getElementById("btnUser");
    const divMain4 = document.getElementById("btnPerson");
    // @ts-ignore
    divMain.style = "display: none;";
    // @ts-ignore
    divMain2.style = "display: block;";
    // @ts-ignore
    divMain3.style = " visibility: hidden;";
    // @ts-ignore
    divMain4.style = " visibility: visible;";
  }

  saveUser() {

    this.userService.getUserData().subscribe(alumno => {
      alumno = alumno["value"];
      console.log(alumno);
      alumno["idAlumno"] = this.idAlumno;
      alumno["nombreAlumno"] = this.nombreAlumno;
      alumno["telefonoAlumno"] = this.telefonoAlumno;
      alumno["emailAlumno"] = this.emailAlumno;
      alumno["usuarioAlumno"] = this.usuarioAlumno;
      alumno["genero"] = this.genero;
      alumno["dniAlumno"] = this.dniAlumno;
      alumno["fechaNacimiento"] =
        this.datePipeEn.transform(this.BirthDate, "yyyy-MM-dd") + "-00:00:00";
      alumno["historialSuscripcion"] = alumno["historialSuscripcion"].reverse();
      this.snackBar.open("Se han actualizado los datos", "Ok", {
        duration: 2000
      });
      this.userService.updateUser(alumno).subscribe(dt => {
        window.location.reload();
      });
    });
  }

  replaceAt(textr, index, replace) {
    return textr.substring(0, index) + replace + textr.substring(index + 1);
  }
}
