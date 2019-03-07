import { Component, OnInit, Inject } from '@angular/core';
import { TrainerStudentScheduleComponent } from '../../trainer-student-schedule/trainer-student-schedule.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-get-medical-history',
  templateUrl: './get-medical-history.component.html',
  styleUrls: ['./get-medical-history.component.css']
})
export class GetMedicalHistoryComponent implements OnInit {

  listaPreguntas = null;
  loading=false;
  constructor(public dialogRef: MatDialogRef<TrainerStudentScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

     }

  ngOnInit() {
    this.listaPreguntas= this.data;
  }

  updatePass(){

  }

}
