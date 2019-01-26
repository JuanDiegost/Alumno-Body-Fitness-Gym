import { Component, OnInit } from "@angular/core";
import { PreguntaService } from "../services/pregunta/pregunta.service";
import {MatSnackBar} from '@angular/material';

@Component({
  selector: "app-student-medical-history",
  templateUrl: "./student-medical-history.component.html",
  styleUrls: ["./student-medical-history.component.css"]
})
export class StudentMedicalHistoryComponent implements OnInit {
  isEditable = true;

  listaPreguntas;

  constructor(public _preguntaService: PreguntaService,private snackBar: MatSnackBar) {}

  ngOnInit() {
    this._preguntaService.getPreguntas().subscribe(data => {
      this.listaPreguntas = data;
    });
  }

  editar(){
    if(!this.isEditable){
       console.log("Guardar cambios");
       this.snackBar.open("Se han guardado correctamente los cambios", "Bien", {
        duration: 2000,
      });
    }
    this.isEditable=!this.isEditable;

  }

  enviar() {}
}
