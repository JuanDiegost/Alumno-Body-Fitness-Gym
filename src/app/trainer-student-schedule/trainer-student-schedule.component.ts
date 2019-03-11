import { Component, OnInit,Input } from '@angular/core';
import { GetStudentsService } from '../services/getStudents/get-students.service';
import { Router } from '@angular/router';
import { HorarioService } from '../services/horario/horario.service';
import { MatDialog } from '@angular/material';
import { GetMedicalHistoryComponent } from '../dialogs/get-medical-history/get-medical-history.component';
import { TrainerStudentMedicalHistoryComponent } from '../dialogs/trainer-student-medical-history/trainer-student-medical-history.component';
import { Constants } from '../util/Constants';
import {Messages} from '../util/Messages';



@Component({
  selector: 'app-trainer-student-schedule',
  templateUrl: './trainer-student-schedule.component.html',
  styleUrls: ['./trainer-student-schedule.component.css']
})
export class TrainerStudentScheduleComponent implements OnInit {
  assistance = null;
  students = null;
  idShedule = null;
  public loading = false;
  medicalHistory = null;
  constructor(private _horarioService: HorarioService,private getStudents: GetStudentsService,private router: Router,public dialog: MatDialog ) {

   }

 ngOnInit( ) {
  this.loading= true;
  this.idShedule=this.getStudents.shedule;
  this.students = this._horarioService.getStudents(this.idShedule).subscribe(data=>{
    data = data["value"];
    this.assistance= data["asistencia"];
    this.loading= false;
  });

  }
  openDialogShowMedicalHistory(student) {
    const dialogRef = this.dialog.open(TrainerStudentMedicalHistoryComponent, {
      width: "70%",
      height: "90%",
      data:  student
    });

    this.showScreenDark(dialogRef);
  }

  private showScreenDark(dialogRef) {
    if (this.isScreenLow()) {
      dialogRef.updateSize("70%", "90%");
    }
    this.setEventOpacityScreen(dialogRef);
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

  private generatePdf(){
    console.log(this.idShedule);
    const URL_PDF:string =  Messages.urlAllSchedules + '/' + this.idShedule + Messages.report_PDF_Schedule;
    window.open(URL_PDF,'_self');
    // window.open(Constants.API_TEXT+"/horarios/"+this.idShedule+"/reporte.pdf",'_self')
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
