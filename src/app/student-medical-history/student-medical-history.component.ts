import { Component, OnInit } from "@angular/core";
import { PreguntaService } from '../services/pregunta/pregunta.service'

@Component({
  selector: "app-student-medical-history",
  templateUrl: "./student-medical-history.component.html",
  styleUrls: ["./student-medical-history.component.css"]
})
export class StudentMedicalHistoryComponent implements OnInit {
  isEditable = false;

  listaPreguntas=["Prsbnd s dsnfksdf","dsfsdn dsnfkdsn fdsfnds fdsofnds", "isdjfsd "];

  constructor(public _preguntaService:PreguntaService) {}

  ngOnInit() {
    this._preguntaService.getPreguntas().subscribe(data=>{
      console.log(data);
    });
  }

  enviar() {}
}
