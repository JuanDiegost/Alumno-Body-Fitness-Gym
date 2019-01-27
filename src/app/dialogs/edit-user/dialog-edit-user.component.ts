import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.css']
})
export class DialogEditUserComponent implements OnInit {
  signupFormModalName = new FormControl('', Validators.required);
  signupFormModalEmail = new FormControl('', Validators.email);
  signupFormModalPassword = new FormControl('', Validators.required);

  constructor() { }

  ngOnInit() {
  }

  displayContentUser(){
    const divMain = document.getElementById('Usuario');
    const divMain2 = document.getElementById('Personal');
    const divMain3 = document.getElementById('btnUser');
    const divMain4 = document.getElementById('btnPerson');
    // @ts-ignore
    divMain.style ='display: block;';
    // @ts-ignore
    divMain2.style ='display: none;';
    // @ts-ignore
    divMain3.style =' visibility: visible;';
    // @ts-ignore
    divMain4.style =' visibility: hidden;';
  }

  displayContentPersonal(){
    const divMain = document.getElementById('Usuario');
    const divMain2 = document.getElementById('Personal');
    const divMain3 = document.getElementById('btnUser');
    const divMain4 = document.getElementById('btnPerson');
    // @ts-ignore
    divMain.style ='display: none;';
    // @ts-ignore
    divMain2.style ='display: block;';
     // @ts-ignore
     divMain3.style =' visibility: hidden;';
     // @ts-ignore
     divMain4.style =' visibility: visible;';
  }
 
  

}
