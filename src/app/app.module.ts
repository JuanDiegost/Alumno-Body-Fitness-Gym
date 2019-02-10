import { BrowserModule } from "@angular/platform-browser";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModules } from "./materialModules";
import { HttpClientModule } from "@angular/common/http";

import { RouterModule, Route } from "@angular/router";

import { NgxLoadingModule } from 'ngx-loading';

//firebase
import { AngularFireModule } from "angularfire2";
import { AngularFireStorageModule } from "angularfire2/storage";


// components
import { HomeComponent } from "./home/home.component";
import { StudentRootComponent } from "./student-root/student-root.component";
import { DialogContentServiceComponent } from "./dialogs/service/dialog-content-service.component";
import { DialogEditUserComponent } from "./dialogs/edit-user/dialog-edit-user.component";
import { DialogLoginComponent } from "./dialogs/login/dialog-login.component";
import { StudentScheduleComponent } from "./student-schedule/student-schedule.component";
import { StudentMedicalHistoryComponent } from "./student-medical-history/student-medical-history.component";
import { AppComponent } from "./app.component";

// cover-flow news
import { KSSwiperModule } from "angular2-swiper";

// carousel news
import { NgxHmCarouselModule } from 'ngx-hm-carousel';

// servicios
import { ServicePageHome } from "./services/page-home/service-page-home.service";
import { ServiceLogin } from "./services/login/service-login.service";
import { PreguntaService } from "./services/pregunta/pregunta.service";
import { ServiceUserService } from "./services/services-user/service-user.service";
import { UploadService } from "./services/upload/upload.service";
import { HorarioService } from "./services/horario/horario.service";

// guards
import { CanActiveVerifyLoginGuard } from "./guards/verify-login/can-active-verify-login.guard";

import { RoutersApp } from "./util/RoutersApp";
import { StudentProgressComponent } from "./student-progress/student-progress.component";
import { ProfileComponent } from "./profile/profile.component";
import { from } from "rxjs";

import { Globals } from "./util/Global";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

//calendar
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { addDays } from 'date-fns';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { DialogEditPassComponent } from './dialogs/dialog-edit-pass/dialog-edit-pass/dialog-edit-pass.component';
//end calendar

const routes: Route[] = [
  { path: RoutersApp.home, component: HomeComponent },
  {
    path: RoutersApp.student,
    component: StudentRootComponent,  canActivate: [CanActiveVerifyLoginGuard],
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
    ProfileComponent,
    DialogEditUserComponent,
    DialogEditPassComponent
  ],
  exports:[StudentScheduleComponent],
  imports: [
   BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModules,
    HttpClientModule,
    KSSwiperModule,
    NgxHmCarouselModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(routes, {useHash: true}), AngularFireModule.initializeApp({
      apiKey: " AIzaSyA10YWRfQ3iExpaF6cP0PQf7YY9ZHnc7jE ",
      authDomain: "body-fitnes-gym",
      storageBucket: "body-fitnes-gym.appspot.com",
      projectId: "body-fitnes-gym"
    }),
    AngularFireStorageModule,
    NgxLoadingModule.forRoot({}),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })

  ],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: [
    DialogContentServiceComponent,
    DialogLoginComponent,
    DialogEditUserComponent,DialogEditPassComponent
  ],
  providers: [
    ServicePageHome,
    ServiceLogin,
    PreguntaService,UploadService,HorarioService,
    Globals,
    ServiceUserService
  ],
  bootstrap: [AppComponent]
})
// @ts-ignore
export class AppModule {}
