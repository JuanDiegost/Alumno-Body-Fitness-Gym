import { Component, OnInit } from "@angular/core";
import { PreguntaService } from "../services/pregunta/pregunta.service";
import { MatSnackBar } from "@angular/material";
import { ServiceUserService } from "../services/services-user/service-user.service";

@Component({
  selector: "app-student-medical-history",
  templateUrl: "./student-medical-history.component.html",
  styleUrls: ["./student-medical-history.component.css"]
})
export class StudentMedicalHistoryComponent implements OnInit {
  isEditable = true;

  listaPreguntas;

  constructor(
    public _preguntaService: PreguntaService,
    private snackBar: MatSnackBar,
    public _userService: ServiceUserService
  ) {}

  ngOnInit() {
    this._preguntaService.getPreguntas().subscribe(data => {
      this.listaPreguntas = data;
    });
    this._userService.getUserData().subscribe(data => {
      data = data["value"];
      data["historialMedico"].forEach(element => {
        this.listaPreguntas.forEach(element2 => {
          if (element.idPregunta === element2.idPregunta) {
            element2["select"] = true;
          }
        });
      });
    });
  }

  editar() {
    if (!this.isEditable) {
      console.log(this.listaPreguntas);
      this._userService.getUserData().subscribe(data => {
        data["value"]["historialSuscripcion"]=data["value"]["historialSuscripcion"].reverse();
        data["value"]["historialMedico"]=[];
        this.listaPreguntas.forEach(element => {
          if (element.select) {
            data["value"]["historialMedico"].push(element);
            console.log(data);
          }
        });
        this._userService.updateUser(data["value"]).subscribe(dat => {
          this.snackBar.open(
            "Se han guardado correctamente los cambios",
            "Ok",
            {
              duration: 2000
            }
          );
        });
      });
    }
    this.isEditable = !this.isEditable;
  }

  enviar() {}
}
