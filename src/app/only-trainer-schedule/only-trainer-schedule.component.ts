import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../services/horario/horario.service';
import { GetStudentsService } from '../services/getStudents/get-students.service';
import { Route, Router } from '@angular/router';
import { RoutersApp } from '../util/RoutersApp';

@Component({
  selector: 'app-only-trainer-schedule',
  templateUrl: './only-trainer-schedule.component.html',
  styleUrls: ['./only-trainer-schedule.component.css']
})
export class OnlyTrainerScheduleComponent implements OnInit {

  constructor(private _horarioService: HorarioService,private getStudents: GetStudentsService,private router: Router  ) { 

  }

  ngOnInit() {

  }

  showStudents(horario){
    this.getStudents.shedule = horario;
    this.router.navigateByUrl(RoutersApp.trainer+"/"+RoutersApp.listStudentForSchedule);
  }


}
