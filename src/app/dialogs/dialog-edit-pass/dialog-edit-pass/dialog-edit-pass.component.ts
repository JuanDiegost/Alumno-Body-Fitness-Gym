import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Inject, LOCALE_ID } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { MatSnackBar } from "@angular/material";
import { ServiceUserService } from "../../../services/services-user/service-user.service";
import {Confirms} from '../../../util/Confirms';
import {ProfileComponent} from '../../../profile/profile.component';



@Component({
  selector: "app-dialog-edit-pass",
  templateUrl: "./dialog-edit-pass.component.html",
  styleUrls: ["./dialog-edit-pass.component.css"]
})
export class DialogEditPassComponent implements OnInit {
  actualPass:string;
  newPass:string;
  username:string;
  constructor(public dialogRef: MatDialogRef<ProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,public userService:ServiceUserService
  ) {}

  ngOnInit() {
    this.username=this.data.username;
  }

  updatePass(){
    this.userService.changePass(this.username,this.actualPass,this.newPass).subscribe(data=>{
      console.log(data);
      Confirms.showSuccessType("Correcto","Se ha actualizado su contraseña");
      this.dialogRef.close(this.username);
    },error=>{
      Confirms.showErrorType("Incorrecto","Credenciales incorrectas");
    })
  }

  closeDialogEditPass() {
    this.dialogRef.close();
  }

}
