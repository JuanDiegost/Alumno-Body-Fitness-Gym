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

  getStudents(idHorario){
    return this.http.get("horario/alumnos/"+idHorario);
  }
}
