import { Component, OnInit } from "@angular/core";
import { ServiceUserService } from "../services/services-user/service-user.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-student-detail",
  templateUrl: "./student-detail.component.html",
  styleUrls: ["./student-detail.component.css"]
})
export class StudentDetailComponent implements OnInit {
  constructor(
    private serviceStudent: ServiceUserService,
    private route: ActivatedRoute
  ) {}

  private student;

  public chartType: string = "line";
  public chartDatasetsMasaCorporal: Array<any> = [];
  public chartDatasetsGrasaCorporal: Array<any> = [];
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

  ngOnInit() {
    this.serviceStudent
      .getStudentData(this.route.snapshot.paramMap.get("id"))
      .subscribe(
        data => {
          this.student = data["value"];
          this.addDataImagenProgres(this.student.historialProgresoImagen);
        },
        err => {}
      );
  }

  addDataImagenProgres(historiaImagen: any[]) {
    historiaImagen.sort(function(a, b) {
      return a.id - b.id;
    });
    let dataMasa = [];
    let dataGrasa = [];
    this.chartLabelsFechas = [];
    historiaImagen.forEach(data => {
      dataGrasa.push(data["grasaCorporal"]);
      dataMasa.push(data["masaCorporal"]);
      this.chartLabelsFechas.push(data["fechaProgresoImagen"].substring(0, 10));
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
}
