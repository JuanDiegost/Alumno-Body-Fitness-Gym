import { Injectable } from "@angular/core";
import { Globals } from "../../util/Global";
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: "root"
})
export class PreguntaService {
  constructor(public global:Globals,public http:HttpClient) {}

  getPreguntas() {
    return this.http.get("/preguntas");
  }
}
