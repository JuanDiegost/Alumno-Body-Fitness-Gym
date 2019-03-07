import { Component, OnInit, Inject } from '@angular/core';
import { TrainerStudentScheduleComponent } from '../../trainer-student-schedule/trainer-student-schedule.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-trainer-student-medical-history',
  templateUrl: './trainer-student-medical-history.component.html',
  styleUrls: ['./trainer-student-medical-history.component.css']
})
export class TrainerStudentMedicalHistoryComponent implements OnInit {

  medicalHistory = null;
  constructor(public dialogRef: MatDialogRef<TrainerStudentScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.medicalHistory = data;
      console.log(this.medicalHistory);
     }

  ngOnInit() {
  }
  close(){
    this.dialogRef.close();
  }

}
