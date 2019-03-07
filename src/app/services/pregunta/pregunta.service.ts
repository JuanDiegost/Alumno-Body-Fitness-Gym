import { Injectable } from "@angular/core";
import { Globals } from "../../util/Global";
import { HttpClient } from '@angular/common/http'
import {Constants} from '../../util/Constants'


@Injectable({
  providedIn: "root"
})
export class PreguntaService {
  constructor(public global:Globals,public http:HttpClient) {}

  getPreguntas() {
    return this.http.get(Constants.API_TEXT+"/preguntas");
  }
}
