import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ServiceUserService {
  constructor(public http:HttpClient) {}

  getUserData(){
    return this.http.get("/alumno/"+localStorage.getItem("idAlumno"));
  }

  updateUser(alumno){
    return this.http.put("/alumno",alumno);
  }
}

