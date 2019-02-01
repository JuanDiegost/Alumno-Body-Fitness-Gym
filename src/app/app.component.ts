import { Component, OnInit } from '@angular/core';
import {RoutersApp} from './util/RoutersApp';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// @ts-ignore
export class AppComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigateByUrl(RoutersApp.student);
  }


}
