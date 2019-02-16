import { Component, OnInit } from "@angular/core";
import { RoutersApp } from "./util/RoutersApp";
import { Router } from "@angular/router";
import { FirebaseApp } from "angularfire2";
import { from } from "rxjs";
import * as AOS from 'aos';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
// @ts-ignore
export class AppComponent implements OnInit {
  constructor(private router: Router,public firebase:FirebaseApp) {}

  ngOnInit() {
    this.router.navigateByUrl(RoutersApp.student+"/"+RoutersApp.profile);
    AOS.init();
  }
}
