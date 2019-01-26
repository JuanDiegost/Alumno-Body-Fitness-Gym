import { BrowserModule } from "@angular/platform-browser";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { FormsModule, ReactiveFormsModule} from "@angular/forms"

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModules } from "./materialModules";
import { HttpClientModule } from "@angular/common/http";

import { RouterModule, Route } from "@angular/router";

// components
import { HomeComponent } from "./home/home.component";
import { StudentRootComponent } from "./student-root/student-root.component";
import { DialogContentServiceComponent } from "./dialogs/service/dialog-content-service.component";
import { DialogLoginComponent } from "./dialogs/login/dialog-login.component";
import { StudentScheduleComponent } from "./student-schedule/student-schedule.component";
import { StudentMedicalHistoryComponent } from "./student-medical-history/student-medical-history.component";
import { AppComponent } from "./app.component";

// cover-flow news
import { KSSwiperModule } from "angular2-swiper";

// servicios
import { ServicePageHome } from "./services/page-home/service-page-home.service";
import { ServiceLogin } from "./services/login/service-login.service";
import { PreguntaService } from "./services/pregunta/pregunta.service"

// guards
import { CanActiveVerifyLoginGuard } from "./guards/verify-login/can-active-verify-login.guard";

import { RoutersApp } from "./util/RoutersApp";
import { StudentProgressComponent } from "./student-progress/student-progress.component";
import { ProfileComponent } from "./profile/profile.component";
import { from } from "rxjs";

import {Globals} from './util/Global'

const routes: Route[] = [
  { path: RoutersApp.home, component: HomeComponent },
  {
    path: RoutersApp.student,
    component: StudentRootComponent, // canActivate: [CanActiveVerifyLoginGuard],
    children: [
      { path: RoutersApp.schedule, component: StudentScheduleComponent },
      { path: RoutersApp.progress, component: StudentProgressComponent },
      {
        path: RoutersApp.medicalHistory,
        component: StudentMedicalHistoryComponent
      },
      { path: RoutersApp.profile, component: ProfileComponent }
    ]
  }
  // {path: 'schedule', component: StudentScheduleComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentRootComponent,
    DialogContentServiceComponent,
    DialogLoginComponent,
    StudentScheduleComponent,
    StudentProgressComponent,
    StudentMedicalHistoryComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModules,
    HttpClientModule,
    KSSwiperModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: [DialogContentServiceComponent, DialogLoginComponent],
  providers: [ServicePageHome, ServiceLogin,PreguntaService,Globals],
  bootstrap: [AppComponent]
})
// @ts-ignore
export class AppModule {}
