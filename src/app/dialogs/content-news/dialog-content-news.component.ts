import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HomeComponent} from '../../home/home.component';

@Component({
  selector: 'app-content-news',
  templateUrl: './dialog-content-news.component.html',
  styleUrls: ['./dialog-content-news.component.css']
})
export class DialogContentNewsComponent {

  constructor(public dialogRef: MatDialogRef<HomeComponent>, @Inject(MAT_DIALOG_DATA) public data) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
