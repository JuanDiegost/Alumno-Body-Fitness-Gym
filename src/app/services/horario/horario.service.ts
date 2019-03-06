import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  constructor(public http:HttpClient) { }

  getHorario() {
    return this.http.get("/horario/filtroSinFechas");
  }

  getHorarioTrainer() {
    return this.http.get("/horario/filtroSinFechas/entrenador/"+localStorage.getItem("idAlumno"));
  }

  getStudents(idHorario){
    return this.http.get("/horario/"+idHorario);
  }
}
