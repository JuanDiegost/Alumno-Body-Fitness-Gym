import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ServiceUserService} from '../../services/services-user/service-user.service';
import {UploadService} from '../../services/upload/upload.service';
import {Constants} from '../../util/Constants';
import {Confirms} from '../../util/Confirms';
import {Messages} from '../../util/Messages';
import {FileUpload} from '../../util/upload';
import * as firebase from 'firebase';
import {ProfileTrainerComponent} from '../../profile-trainer/profile-trainer.component';

@Component({
  selector: 'app-edit-trainer',
  templateUrl: './dialog-edit-trainer.component.html',
  styleUrls: ['./dialog-edit-trainer.component.css']
})
export class DialogEditTrainerComponent implements OnInit {
  signupFormModalUser = new FormControl('', Validators.required);
  signupFormModalName = new FormControl('/[^A-Za-zñáéíóú ]+/g', Validators.required);
  signupFormModalEmail = new FormControl('', Validators.email);
  signupFormModalDni = new FormControl('', Validators.required);
  signupFormModalTelefono = new FormControl('', Validators.required);

  dniEntrenador;
  nombreEntrenador;
  telefonoEntrenador;
  emailEntrenador;
  selectedFiles;
  currentFileUpload;
  progress;
  urlImg;
  public loading = false;
  public dialog;

  constructor(
    public dialogRef: MatDialogRef<ProfileTrainerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: ServiceUserService,
    private snackBar: MatSnackBar,
    public uploadService: UploadService
  ) {}

  ngOnInit() {
    this.dniEntrenador = this.data.dniEntrenador;
    this.nombreEntrenador = this.data.nombreEntrenador;
    this.telefonoEntrenador = this.data.telefonoEntrenador;
    this.emailEntrenador = this.data.emailEntrenador;
    this.urlImg = this.data.urlImagenEntrenador;
    this.displayContentPersonal();
  }

  displayContentUser() {
    const divMain = document.getElementById('Usuario');
    const divMain2 = document.getElementById('Personal');
    const divMain3 = document.getElementById('btnUser');
    const divMain4 = document.getElementById('btnPerson');
    // @ts-ignore
    divMain.style = 'display: block;';
    // @ts-ignore
    divMain2.style = 'display: none;';
    // @ts-ignore
    divMain3.style = ' visibility: visible;';
    // @ts-ignore
    divMain4.style = ' visibility: hidden;';
  }

  displayContentPersonal() {
    const divMain = document.getElementById('Usuario');
    const divMain2 = document.getElementById('Personal');
    const divMain3 = document.getElementById('btnUser');
    const divMain4 = document.getElementById('btnPerson');
    // @ts-ignore
    divMain.style = 'display: none;';
    // @ts-ignore
    divMain2.style = 'display: block;';
    // @ts-ignore
    divMain3.style = ' visibility: hidden;';
    // @ts-ignore
    divMain4.style = ' visibility: visible;';
  }

  saveUser() {
    this.userService.getUserDataTrainer().subscribe(trainer => {
      // TODO Borrar imagen angular     // this.uploadService.deleteFileUpload(alumno["urlImagenUsuario"]);
      trainer = trainer['value'];
      trainer['urlImagenEntrenador'] = this.urlImg;
      trainer['telefonoEntrenador'] = this.telefonoEntrenador;
      if (this.telefonoEntrenador.match(Constants.regexOnlyNumbers) === null) {
        Confirms.showErrorType(Messages.titleErrorPatternOnlyLettersAndSpace, Messages.messageErrorPatternOnlyNumbers);
        return;
      }
      trainer['emailEntrenador'] = this.emailEntrenador;
      trainer['contraseniaEntrenador'] = this.telefonoEntrenador;
      this.loading = true;
      this.userService.updateUserTrainer(trainer).subscribe(dt => {
        this.loading = true;
        Confirms.showSuccessType(
          'Correcto',
          'Se ha actualizado su información personal'
        );
        this.dialogRef.close(trainer);
      });
    });
  }

  saveImage() {
    this.userService.getUserDataTrainer().subscribe(trainer => {
      trainer = trainer['value'];
      console.log(trainer);
      trainer['urlImagenEntrenador'] = this.urlImg;
      this.userService.updateUserTrainer(trainer).subscribe(dt => {
        this.loading = true;
        Confirms.showSuccessType(
          'Correcto',
          'Se ha actualizado su información personal'
        );
        this.dialogRef.close(trainer);
      }, error => {
        Confirms.showErrorType('Error', 'No se ha podido cambiar, nombre de usuario ya esta en uso');
      });
    });
  }

  onFileSelectedListener(event) {
    const myDiv = document.getElementById('progress-element');
    myDiv.style.display = 'flex';
    this.selectedFiles = event.target.files;
    const file = this.selectedFiles.item(0);
    const fileExtension = '.' + file.name.split('.').pop();
    const name =
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
        myDiv.style.display = 'none';
      }
    );
  }

  _onlyLetters(event: any) {
    const pattern = /[A-Za-zñáéíóú ]+/g;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  _onlyNumbers(event: any) {
    const pattern = /^[0-9]*$/gm;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  closeDialogEditUser() {
    this.dialogRef.close();
  }

}
