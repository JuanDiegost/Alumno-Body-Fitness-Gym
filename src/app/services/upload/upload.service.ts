import { Injectable } from "@angular/core";
import { FileUpload } from "../../util/upload";
import * as firebase from "firebase";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UploadService {
  private basePath = "/uploads";
  private basePathProgress = "/progress";

  constructor() {}

  pushFileToStorage(fileUpload: FileUpload) {
    const storageRef = firebase.storage().ref();
    console.log(storageRef);
    return storageRef
      .child(`${this.basePath}/${fileUpload.name}`)
      .put(fileUpload.file);


  }

  pushFileToStorageProgress(fileUpload: FileUpload) {
    const storageRef = firebase.storage().ref();
    console.log(storageRef);
    return storageRef
      .child(`${this.basePathProgress}/${localStorage.getItem("idAlumno")}/${fileUpload.name}`)
      .put(fileUpload.file);
  }

  deleteFileUpload(name: string) {
    this.deleteFileStorage(name);
  }

  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }
}
