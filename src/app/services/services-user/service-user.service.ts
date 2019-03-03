import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Constants} from "../../util/Constants"

@Injectable({
  providedIn: "root"
})
export class ServiceUserService {
  constructor(public http:HttpClient) {}

  getUserDataTrainer(){
    return this.http.get("/entrenador/"+localStorage.getItem("idAlumno"));
  }

  getUserData(){
    return this.http.get("/alumno/"+localStorage.getItem("idAlumno"));
  }

  getStudentData(id){
    return this.http.get("/alumno/"+id);
  }

  updateUser(alumno){
    return this.http.put("/alumno",alumno);
  }

  updateUserTrainer(trainer) {
    return this.http.put('/entrenador', trainer);
  }

  changePass(username:string,actualPass:string,newPass:string){
    return this.http.get("/cambiarContrasenia/"+username+"/"+actualPass+"/"+newPass);
  }

  addProgress(data){
    return this.http.post("/progresoImagen/"+localStorage.getItem("idAlumno"),data);
  }

  deletProgres(id){
    return this.http.delete("progresoImagen/"+id);
  }

  getListAlumn(){
    return this.http.get("/alumnos");
  }

  generatePdf(){
    window.open(Constants.URL_BACKEND+"/alumno/"+localStorage.getItem("idAlumno")+"/reporte.pdf",'_self')
  }

}
