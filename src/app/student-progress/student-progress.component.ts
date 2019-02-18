import { Component, OnInit } from "@angular/core";
import { ServiceUserService } from "../services/services-user/service-user.service";
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from "ngx-gallery";
import { MatDialog } from "@angular/material";
import { DialogAddProgressComponent } from "../dialogs/dialog-add-progress/dialog-add-progress.component";


@Component({
  selector: "app-student-progress",
  templateUrl: "./student-progress.component.html",
  styleUrls: ["./student-progress.component.css"]
})
export class StudentProgressComponent implements OnInit {
  /* public chartType: string = 'horizontalBar'; */
  public chartType: string = "line";

  public chartDatasetsMasaCorporal: Array<any> = [];
  public chartDatasetsGrasaCorporal: Array<any> = [];
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  private student;

  public chartLabelsFechas: Array<any> = [];
  public loading = true;
  public chartColors: Array<any> = [
    {
      backgroundColor: "rgba(105, 0, 132, .2)",
      borderColor: "rgba(200, 99, 132, .7)",
      borderWidth: 2
    },
    {
      backgroundColor: "rgba(0, 137, 132, .2)",
      borderColor: "rgba(0, 10, 130, .7)",
      borderWidth: 2
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void {}
  public chartHovered(e: any): void {}

  constructor(
    public dialog: MatDialog,
    public servicesUser: ServiceUserService
  ) {
    this.dialog.afterAllClosed.subscribe(data => {
      this.loading = true;
      setTimeout(() => {
        this.getData();
      }, 3000);
    });
  }

  ngOnInit() {
    this.getData();
    this.galleryOptions = [
      { "imageDescription": true },
      { "breakpoint": 500, "width": "300px", "height": "300px", "thumbnailsColumns": 3 },
      { "breakpoint": 300, "width": "100%", "height": "200px", "thumbnailsColumns": 2 }
      ] ;
    this.galleryImages = [];
  }
  getData() {
    this.servicesUser.getUserData().subscribe(data => {
      this.student=data["value"];
      this.addDataImagenProgres(data["value"]["historialProgresoImagen"]);
    });
  }

  openDialogAddProgress() {
    const dialogRef = this.dialog.open(DialogAddProgressComponent, {
      width: "35%",
      height: "90%"
    });

    this.showScreenDark(dialogRef);
  }

  addDataImagenProgres(historiaImagen: any[]) {
    historiaImagen.sort(function(a, b) {
      return a.id - b.id;
    });
    this.student.historialProgresoImagen=historiaImagen;
    let dataMasa = [];
    let dataGrasa = [];
    this.chartLabelsFechas = [];
    this.galleryImages=[];
    historiaImagen.forEach(data => {
      dataGrasa.push(data["grasaCorporal"]);
      dataMasa.push(data["masaCorporal"]);
      this.chartLabelsFechas.push(data["fechaProgresoImagen"].substring(0, 10));
      this.galleryImages.push({
        small: data.url,
        medium: data.url,
        big: data.url,
        description:"Fecha: "+data.fechaProgresoImagen.substring(0, 10)
      });
    });
    this.chartDatasetsMasaCorporal = [];
    console.log(dataGrasa);
    this.chartDatasetsMasaCorporal.push({
      data: dataMasa,
      label: "Masa corporal"
    });
    this.chartDatasetsGrasaCorporal = [];
    this.chartDatasetsGrasaCorporal.push({
      data: dataGrasa,
      label: "Grasa Corporal"
    });

    this.loading = false;
  }

  private showScreenDark(dialogRef) {
    if (this.isScreenLow()) {
      dialogRef.updateSize("70%", "90%");
    }
    this.setEventOpacityScreen(dialogRef);
  }

  eliminarProgeso(id){
    this.servicesUser.deletProgres(id).subscribe(data=>{
      console.log(data);
    });
  }

  generatePdf(){
    this.servicesUser.generatePdf();
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
}
