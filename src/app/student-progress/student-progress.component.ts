import { Component, OnInit } from "@angular/core";
import { ServiceUserService } from "../services/services-user/service-user.service";
import { GalleryItem, ImageItem } from '@ngx-gallery/core';

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
  public images: GalleryItem[]=[];

  public chartLabelsFechas: Array<any>=[];
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

  constructor(public servicesUser: ServiceUserService) {}

  ngOnInit() {
    this.servicesUser.getUserData().subscribe(data => {
      this.addDataImagenProgres(data["value"]["historialProgresoImagen"]);
    });
  }

  addDataImagenProgres(historiaImagen: any[]) {
    historiaImagen = historiaImagen.reverse();
    let dataMasa=[];
    let dataGrasa=[];
    historiaImagen.forEach(data => {
      dataGrasa.push(data["grasaCorporal"]);
      dataMasa.push(data["masaCorporal"]);
      this.chartLabelsFechas.push(data["fechaProgresoImagen"]);
      this.images.push(new ImageItem({ src: data.url, thumb: data.url }));
    });
    console.log(dataGrasa);
    this.chartDatasetsMasaCorporal.push({data:dataMasa,label: 'My First dataset'});
    this.chartDatasetsGrasaCorporal.push({data:dataGrasa,label: 'My First dataset'});
    this.loading=false;
  }
}
