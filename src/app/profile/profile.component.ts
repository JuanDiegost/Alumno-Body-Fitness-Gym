import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { DialogEditUserComponent } from "./../dialogs/edit-user/dialog-edit-user.component";
import { ServiceUserService } from "../services/services-user/service-user.service";
import { DialogEditPassComponent } from "../dialogs/dialog-edit-pass/dialog-edit-pass/dialog-edit-pass.component";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  panelOpenState = false;

  constructor(
    public dialog: MatDialog,
    public userService: ServiceUserService
  ) {
    this.dialog.afterAllClosed.subscribe(data => {
      this.loading = true;
      setTimeout(() => {
        this.getDataUser();
      }, 1000);
    });
  }

  idAlumno: number;
  dniAlumno: String;
  nombreAlumno: String;
  telefonoAlumno: String;
  emailAlumno: String;
  urlImagenUsuario: String;
  usuarioAlumno: String;
  historialSuscripciones: any[];
  historiaMedico: any[];
  ultimaSuscripcion: any;
  diasdif;
  fechaNacimiento;
  genero;

  public loading = true;

  ngOnInit() {
    this.getDataUser();
  }

  getDataUser() {
    this.loading = true;

    this.userService.getUserData().subscribe(res => {
      this.loading = false;
      res = res["value"];
      console.log(res);
      this.idAlumno = res["idAlumno"];
      this.dniAlumno = res["dniAlumno"];
      this.nombreAlumno = res["nombreAlumno"];
      this.telefonoAlumno = res["telefonoAlumno"];
      this.urlImagenUsuario = res["urlImagenUsuario"];
      this.emailAlumno = res["emailAlumno"];
      this.usuarioAlumno = res["usuarioAlumno"];
      this.historiaMedico = res["historialMedico"];
      this.fechaNacimiento = res["fechaNacimiento"];
      this.historialSuscripciones = res["historialSuscripcion"];
      this.genero = res["genero"];
      //this.historialSuscripciones = this.historialSuscripciones.reverse();
      this.ultimaSuscripcion = this.historialSuscripciones[0];
      let now = new Date();
      let date = new Date(
        this.replaceAt(this.ultimaSuscripcion.fechaFin, 10, " ")
      );
      this.diasdif = date.getTime() - now.getTime();
      this.diasdif = Math.round(this.diasdif / (1000 * 60 * 60 * 24));
    });
  }

  openDialogEditUser() {
    const dialogRef = this.dialog.open(DialogEditUserComponent, {
      width: "35%",
      height: "90%",
      data: {
        idAlumno: this.idAlumno,
        dniAlumno: this.dniAlumno,
        nombreAlumno: this.nombreAlumno,
        telefonoAlumno: this.telefonoAlumno,
        emailAlumno: this.emailAlumno,
        usuarioAlumno: this.usuarioAlumno,
        fechaNacimiento: this.fechaNacimiento,
        genero: this.genero,
        urlImg: this.urlImagenUsuario
      }
    });
    this.showScreenDark(dialogRef);
  }

  openDialogEditPasswordUser() {
    const dialogRef = this.dialog.open(DialogEditPassComponent, {
      width: "500px",
      data: { username: this.usuarioAlumno }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });

    this.showScreenDark(dialogRef);
  }

  private showScreenDark(dialogRef) {
    if (this.isScreenLow()) {
      dialogRef.updateSize("70%", "90%");
    }
    this.setEventOpacityScreen(dialogRef);
  }
  isScreenLow(): boolean {
    return window.screen.width < 900;
  }
  private setEventOpacityScreen(dialogRef) {
    const divMain = document.getElementById("div-main");
    // events for opacity screen
    this.setOpacityScreenLight(divMain);
    // events for leave the screen regular
    dialogRef.beforeClosed().subscribe(result => {
      this.setOpacityScreenRegular(divMain);
    });
  }

  private setOpacityScreenLight(divMain: HTMLElement) {
    // @ts-ignore
    divMain.style =
      "filter: alpha(opacity=0.1); /* internet explorer */\n" +
      "  -khtml-opacity: 0.1;      /* khtml, old safari */\n" +
      "  -moz-opacity: 0.1;      /* mozilla, netscape */\n" +
      "  opacity: 0.1;      /* fx, safari, opera */";
  }

  private setOpacityScreenRegular(divMain: HTMLElement) {
    // @ts-ignore
    divMain.style =
      "filter: alpha(opacity=1); /* internet explorer */\n" +
      "  -khtml-opacity: 1;      /* khtml, old safari */\n" +
      "  -moz-opacity: 1;      /* mozilla, netscape */\n" +
      "  opacity: 1;      /* fx, safari, opera */";
  }
  replaceAt(textr, index, replace) {
    return textr.substring(0, index) + replace + textr.substring(index + 1);
  }
}
