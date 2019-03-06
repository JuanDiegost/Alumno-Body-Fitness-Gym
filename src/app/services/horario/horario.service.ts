import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../../util/Constants'

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  constructor(public http:HttpClient) { }

  getHorario() {
    return this.http.get(Constants.API_TEXT+"/horario/filtroSinFechas");
  }

  getHorarioTrainer() {
    return this.http.get(Constants.API_TEXT+"/horario/filtroSinFechas/entrenador/"+localStorage.getItem("idAlumno"));
  }

  getStudents(idHorario){
    return this.http.get(Constants.API_TEXT+"/horario/"+idHorario);
  }
}
