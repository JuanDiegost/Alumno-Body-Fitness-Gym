import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Inject, LOCALE_ID } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { ServiceUserService } from "../../services/services-user/service-user.service";
import { DatePipe } from "@angular/common";
import { MatSnackBar } from "@angular/material";
import { UploadService } from "../../services/upload/upload.service";
import { FileUpload } from "../../util/upload";
import * as firebase from "firebase";
import { Confirms } from "../../util/Confirms";

@Component({
  selector: "app-dialog-edit-user",
  templateUrl: "./dialog-edit-user.component.html",
  styleUrls: ["./dialog-edit-user.component.css"]
})
export class DialogEditUserComponent implements OnInit {
  signupFormModalUser = new FormControl("", Validators.required);
  signupFormModalName = new FormControl("", Validators.required);
  signupFormModalEmail = new FormControl("", Validators.email);
  signupFormModalPassword = new FormControl("", Validators.required);
  signupFormModalDni = new FormControl("", Validators.required);
  signupFormModalGenero = new FormControl("", Validators.required,Validators.pattern("/^[a-zA-Z]+$/"));
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
  selectedFiles;
  currentFileUpload;
  progress;
  urlImg;
  public loading = false;
  public dialog;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: ServiceUserService,
    private snackBar: MatSnackBar,
    public uploadService: UploadService
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
    this.urlImg = this.data.urlImg;
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
      //TODO Borrar imagen angular     //this.uploadService.deleteFileUpload(alumno["urlImagenUsuario"]);
      alumno = alumno["value"];
      console.log(alumno);
      alumno["nombreAlumno"] = this.nombreAlumno;
      alumno["telefonoAlumno"] = this.telefonoAlumno;
      alumno["emailAlumno"] = this.emailAlumno;
      alumno["usuarioAlumno"] = this.usuarioAlumno;
      alumno["genero"] = this.genero;
      alumno["fechaNacimiento"] =
        this.datePipeEn.transform(this.BirthDate, "yyyy-MM-dd") + "-00:00:00";
      alumno["historialSuscripcion"] = alumno["historialSuscripcion"].reverse();
      this.loading = true;
      this.userService.updateUser(alumno).subscribe(dt => {
        this.loading = true;
        Confirms.showSuccessType(
          "Correcto",
          "Se ha actualizado su infromación personal"
        );
      });
    });
  }

  guardarDatos() {
    this.userService.getUserData().subscribe(alumno => {
      alumno = alumno["value"];
      console.log(alumno);
      alumno["usuarioAlumno"] = this.usuarioAlumno;
      alumno["urlImagenUsuario"] = this.urlImg;
      this.userService.updateUser(alumno).subscribe(dt => {
        this.loading = true;
        Confirms.showSuccessType(
          "Correcto",
          "Se ha actualizado su infromación personal"
        );
      },error=>{
        Confirms.showErrorType("Error","No se ha podido cambiar, nombre de usuario ya esta en uso");
      });
    });
  }

  onFileSelectedListener(event) {
    let myDiv = document.getElementById("progress-element");
    myDiv.style.display = "flex";
    this.selectedFiles = event.target.files;
    const file = this.selectedFiles.item(0);
    let fileExtension = "." + file.name.split(".").pop();
    let name =
      Math.random()
        .toString(36)
        .substring(7) +
      new Date().getTime() +
      fileExtension;
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file, name);
    const uploadTask = this.uploadService.pushFileToStorage(
      this.currentFileUpload
    );
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        this.progress = Math.round(
          (snap.bytesTransferred / snap.totalBytes) * 100
        );
      },
      error => {
        // fail
        console.log(error);
      },
      () => {
        // success
        this.currentFileUpload.url = uploadTask.snapshot.downloadURL;
        this.urlImg = this.currentFileUpload.url;
        myDiv.style.display = "none";
      }
    );
  }

  replaceAt(textr, index, replace) {
    return textr.substring(0, index) + replace + textr.substring(index + 1);
  }
}
