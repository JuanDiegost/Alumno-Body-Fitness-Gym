import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Constants} from "../../util/Constants"

@Injectable({
  providedIn: "root"
})
export class ServiceUserService {
  constructor(public http:HttpClient) {}

  getUserDataTrainer(){
    return this.http.get(Constants.API_TEXT+"/entrenador/"+localStorage.getItem("idAlumno"));
  }

  getUserData(){
    return this.http.get(Constants.API_TEXT+"/alumno/"+localStorage.getItem("idAlumno"));
  }

  getStudentData(id){
    return this.http.get(Constants.API_TEXT+"/alumno/"+id);
  }

  updateUser(alumno){
    return this.http.put(Constants.API_TEXT+"/alumno",alumno);
  }

  updateUserTrainer(trainer) {
    return this.http.put(Constants.API_TEXT+'/entrenador', trainer);
  }

  changePass(username:string,actualPass:string,newPass:string){
    return this.http.get(Constants.API_TEXT+"/cambiarContrasenia/"+username+"/"+actualPass+"/"+newPass);
  }

  addProgress(data){
    return this.http.post(Constants.API_TEXT+"/progresoImagen/"+localStorage.getItem("idAlumno"),data);
  }

  deletProgres(id){
    return this.http.delete(Constants.API_TEXT+"/progresoImagen/"+id);
  }

  getListAlumn(){
    return this.http.get(Constants.API_TEXT+"/alumnos");
  }

  generatePdf(){
    window.open(Constants.API_TEXT+"/alumno/"+localStorage.getItem("idAlumno")+"/reporte.pdf",'_self')
  }

}
