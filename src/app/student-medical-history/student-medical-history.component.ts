import { Component, OnInit } from "@angular/core";
import { PreguntaService } from "../services/pregunta/pregunta.service";
import { MatSnackBar } from "@angular/material";
import { ServiceUserService } from "../services/services-user/service-user.service";
import { Confirms } from "../util/Confirms";
import { Messages } from "../util/Messages";
@Component({
  selector: "app-student-medical-history",
  templateUrl: "./student-medical-history.component.html",
  styleUrls: ["./student-medical-history.component.css"]
})
export class StudentMedicalHistoryComponent implements OnInit {
  isEditable = true;
  private isLoaing = true;
  listaPreguntas;
  public loading = false;

  constructor(
    public _preguntaService: PreguntaService,
    private snackBar: MatSnackBar,
    public _userService: ServiceUserService
  ) {}

  ngOnInit() {
    this.loading = true;
    this._preguntaService.getPreguntas().subscribe(data => {
      this.listaPreguntas = data;
      this._userService.getUserData().subscribe(data => {
        data = data["value"];
        data["historialMedico"].forEach(element => {
          this.listaPreguntas.forEach(element2 => {
            if (element.idPregunta === element2.idPregunta) {
              element2["select"] = true;
            }
          });
        });
        this.isLoaing = false;
        this.loading = false;
      });
    });
  }

  editar() {
    if (!this.isEditable) {
      this.loading = true;
      console.log(this.listaPreguntas);
      this._userService.getUserData().subscribe(data => {
        data["value"]["historialSuscripcion"] = data["value"][
          "historialSuscripcion"
        ].reverse();
        data["value"]["historialMedico"] = [];
        this.listaPreguntas.forEach(element => {
          if (element.select) {
            data["value"]["historialMedico"].push(element);
          }
        });
        this._userService.updateUser(data["value"]).subscribe(
          data => {
            this.loading = false;
            Confirms.showSuccessType(
              Messages.titleGuardadoCambios,
              Messages.messageGuardadoCambios
            );
          },
          error => {
            this.loading = false;
            Confirms.showErrorType(
              Messages.titleErrorConnection,
              Messages.messageErrorGuardadoCambios
            );
          }
        );
      });
    }
    this.isEditable = !this.isEditable;
  }

  enviar() {}
}
