import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  constructor(public http:HttpClient) { }

  getHorario() {
    return this.http.get("/horario/filtro/2019-02-02-12:12:12/2019-02-06-12:12:12");
  }
}
