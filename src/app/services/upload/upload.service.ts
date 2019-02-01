import { Injectable } from "@angular/core";
import { FileUpload } from "../../util/upload";
import * as firebase from "firebase";

@Injectable({
  providedIn: "root"
})
export class UploadService {
  private basePath = "/uploads";

  constructor() {}

  pushFileToStorage(fileUpload: FileUpload, progress: { percentage: number }) {
    const storageRef = firebase.storage().ref();
    console.log(storageRef);
    const uploadTask = storageRef
      .child(`${this.basePath}/${fileUpload.file.name}`)
      .put(fileUpload.file);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round(
          (snap.bytesTransferred / snap.totalBytes) * 100
        );
      },
      error => {
        // fail
        console.log(error);
      },
      () => {
        // success
        fileUpload.url = uploadTask.snapshot.downloadURL;
        fileUpload.name = fileUpload.file.name;
        console.log(fileUpload);
      }
    );
  }

  deleteFileUpload(fileUpload: FileUpload) {
    this.deleteFileStorage(fileUpload.name);
  }

  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }
}
