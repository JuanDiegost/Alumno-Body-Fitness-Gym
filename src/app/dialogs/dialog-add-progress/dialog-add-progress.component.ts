import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { ServiceUserService } from "../../services/services-user/service-user.service";
import { Confirms } from "../../util/Confirms";
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import {UploadFileService} from '../../upload-file.service'
import {Constants} from '../../util/Constants'

@Component({
  selector: "app-dialog-add-progress",
  templateUrl: "./dialog-add-progress.component.html",
  styleUrls: ["./dialog-add-progress.component.css"]
})
export class DialogAddProgressComponent implements OnInit {
  datePipeEn: DatePipe = new DatePipe("en-US");

  public urlImg: string;
  public dateProgress;
  public masaCorporal: number;
  public grasaCorporal: number;
  public loading = false;

  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }

  constructor(private uploadService: UploadFileService,
    public userService: ServiceUserService) { }

  selectFile(event) {
    const file = event.target.files.item(0)

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
      this.upload();
    } else {
      alert('invalid format!');
    }
  }

  upload() {
    this.progress.percentage = 0;
    const file = this.selectedFiles.item(0);

    this.currentFileUpload = this.selectedFiles.item(0)
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.urlImg=Constants.URL_BACKEND+event.body;
      }
    })

    this.selectedFiles = undefined
  }


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

}
