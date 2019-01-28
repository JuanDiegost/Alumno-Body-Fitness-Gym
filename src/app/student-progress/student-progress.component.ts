import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-student-progress",
  templateUrl: "./student-progress.component.html",
  styleUrls: ["./student-progress.component.css"]
})
export class StudentProgressComponent implements OnInit {
  /* public chartType: string = 'horizontalBar'; */
  public chartType: string = "line";

  public chartDatasets: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: "My First dataset" }
  ];

  public chartLabels: Array<any> = [
    "Red",
    "Blue",
    "Yellow",
    "Green",
    "Purple",
    "Orange"
  ];

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

  constructor() {}

  ngOnInit() {}
}
