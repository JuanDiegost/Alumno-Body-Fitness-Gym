import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-medical-history',
  templateUrl: './student-medical-history.component.html',
  styleUrls: ['./student-medical-history.component.css']
})
export class StudentMedicalHistoryComponent implements OnInit {

  startDate = new Date(1990, 0, 1);

  tiposSangre: string[] = ['A','B','O','AB'];
  rHs: string[] = ['+ Positivo','- Negativo'];

  constructor() { }

  ngOnInit() {
  }

}
