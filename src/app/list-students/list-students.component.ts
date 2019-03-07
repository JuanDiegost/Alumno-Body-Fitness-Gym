import { Component, OnInit } from "@angular/core";
import { ServiceUserService } from "../services/services-user/service-user.service";

@Component({
  selector: "app-list-students",
  templateUrl: "./list-students.component.html",
  styleUrls: ["./list-students.component.css"]
})
export class ListStudentsComponent implements OnInit {
  constructor(public service:ServiceUserService) {}

  public students;
  public loading=true;

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents(){
    this.service.getListAlumn().subscribe(data=>{
        this.students=data;
        this.loading=false;
    },err=>{

    });
  }

  showMore(student){

  }
}
