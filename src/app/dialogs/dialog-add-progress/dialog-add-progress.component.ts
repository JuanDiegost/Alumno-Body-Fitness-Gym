import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { UploadService } from "../../services/upload/upload.service";
import { FileUpload } from "../../util/upload";
import * as firebase from "firebase";
import { ServiceUserService } from "../../services/services-user/service-user.service";
import { Confirms } from "../../util/Confirms";

@Component({
  selector: "app-dialog-add-progress",
  templateUrl: "./dialog-add-progress.component.html",
  styleUrls: ["./dialog-add-progress.component.css"]
})
export class DialogAddProgressComponent implements OnInit {
  datePipeEn: DatePipe = new DatePipe("en-US");

  public urlImg: string;
  public progress;
  public dateProgress;
  public selectedFiles;
  public currentFileUpload;
  public masaCorporal: number;
  public grasaCorporal: number;
  public loading = false;

  constructor(
    public uploadService: UploadService,
    public userService: ServiceUserService
  ) {}

  ngOnInit() {}

  guardarDatos() {
    const fecha =
      this.datePipeEn.transform(this.dateProgress, "yyyy-MM-dd") + "-00:00:00";
    let progreso = {
      url: this.urlImg,
      fechaProgresoImagen: fecha,
      masaCorporal: this.masaCorporal,
      grasaCorporal: this.grasaCorporal
    };
    this.loading = true;
    this.userService.addProgress(progreso).subscribe(data => {
      this.loading = false;
      Confirms.showSuccessType(
        "Correcto",
        "Se ha guardado"
      );
    },err=>{
      this.loading = false;
      Confirms.showErrorType("Error","Con el procesamiento de imágenes");
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
    const uploadTask = this.uploadService.pushFileToStorageProgress(
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
}
