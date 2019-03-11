import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HomeComponent} from '../../home/home.component';
import {ChipServices} from '../../interfaces';

@Component({
  templateUrl: './dialog-service.component.html',
  styleUrls: ['./dialog-service.component.css']
})
// @ts-ignore
export class DialogContentServiceComponent {
  // @ts-ignore
  constructor(public dialogRef: MatDialogRef<HomeComponent>, @Inject(MAT_DIALOG_DATA) public data) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
