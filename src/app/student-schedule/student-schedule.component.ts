import { Component, OnInit,ChangeDetectionStrategy  } from '@angular/core';
import{HorarioService} from './../services/horario/horario.service';

//import { colors } from './../demo-modules/demo-utils/colors';
import { CommonModule } from '@angular/common';
import {

  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};



@Component({
  selector: 'app-student-schedule',
  templateUrl: './student-schedule.component.html',
  styleUrls: ['./student-schedule.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// @ts-ignore
export class StudentScheduleComponent implements OnInit {

  private sorted = false;
  listaHoraio;
  dia;
  dia1;
  result;
  descrip= String;
  listaH;


  public loading = true;
  // calendar
              @ViewChild('modalContent') modalContent: TemplateRef<any>;

              view: CalendarView = CalendarView.Month;

              CalendarView = CalendarView;

              viewDate: Date = new Date();

              modalData: {
                action: string;
                event: CalendarEvent;
              };

              actions: CalendarEventAction[] = [
                {
                  label: '<i class="fa fa-fw fa-pencil"></i>',
                  onClick: ({ event }: { event: CalendarEvent }): void => {
                    this.handleEvent('Edited', event);
                  }
                },
                {
                  label: '<i class="fa fa-fw fa-times"></i>',
                  onClick: ({ event }: { event: CalendarEvent }): void => {
                    this.events = this.events.filter(iEvent => iEvent !== event);
                    this.handleEvent('Deleted', event);
                  }
                }
              ];

              refresh: Subject<any> = new Subject();

              events: CalendarEvent[] = [

              ];

              activeDayIsOpen: boolean = true;


              dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
                if (isSameMonth(date, this.viewDate)) {
                  this.viewDate = date;
                  if (
                    (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                    events.length === 0
                  ) {
                    this.activeDayIsOpen = false;
                  } else {
                    this.activeDayIsOpen = true;
                  }
                }
              }

              eventTimesChanged({
                event,
                newStart,
                newEnd
              }: CalendarEventTimesChangedEvent): void {
                event.start = newStart;
                event.end = newEnd;
                this.handleEvent('Dropped or resized', event);
                this.refresh.next();
              }

              handleEvent(action: string, event: CalendarEvent): void {
                this.modalData = { event, action };
               // this.modal.open(this.modalContent, { size: 'lg' });
              }

              addEvent(): void {
                this.events.push({
                  title: 'New event',
                  start: startOfDay(new Date()),
                  end: endOfDay(new Date()),
                  color: colors.red,
                  draggable: true,
                  resizable: {
                    beforeStart: true,
                    afterEnd: true
                  }
                });
                this.refresh.next();
              }

              addEvent1(initDate,finDate,descripcion,init): void {
                this.events.push({
                  title: descripcion,
                  start: addHours(startOfDay(initDate),init),
                  end: finDate,
                  color: colors.blue,
                  draggable: true,
                  resizable: {
                    beforeStart: true,
                    afterEnd: true
                  }

                });
                this.refresh.next();
              }
              addHour(initDate,finDate,initial){
                this.events.push({
                  start: addHours(startOfDay(initDate),initial),
                  end: finDate,
                  title: 'A draggable and resizable event',
                  color: colors.yellow,
                  actions: this.actions,
                  resizable: {
                    beforeStart: true,
                    afterEnd: true
                  },
                  draggable: true
                });
                this.refresh.next();
              }

  //end calendar
  constructor(public _horarioService: HorarioService,) { }


  ngOnInit() {
    this.loading=true;
    this._horarioService.getHorario().subscribe(data => {
      // console.log(data);
      this.listaHoraio = data;
      //console.log(this.listaHoraio);
      this.dia = this.yyyymmdd();
      this.dia1=this.yyyymmdd1();

      console.log(this.listaHoraio);
      for (let row of this.listaHoraio){

        var initialHourDate = row[0].split("-");
        var anio =initialHourDate[0];
        var mes =initialHourDate[1];
        var diaS =initialHourDate[2];
        var initialDate = initialHourDate[3];

        var hours= initialDate.split(":");
        var initHour = new Date(anio, mes-1, diaS, hours[0], hours[1], hours[2]);
        console.log(initHour);


        var diaLastWeek = row[1];
        var finHourClass = diaLastWeek.split("-");
        var anioF =finHourClass[0];
        var mesF =finHourClass[1];
        var diaF =finHourClass[2];

        var finDate = finHourClass[3].split(":");

        var FinHour = new Date(anioF, mesF-1,diaF, finDate[0], finDate[1],finDate[2]);
        console.log(FinHour);

        var descripcion = row[3];

        this.addEvent1(initHour,FinHour,descripcion,hours[0]);
        //this.addHour(initHour,FinHour,hours[0]);

      }
      this.result= this.diaSemana(2019,2,5);
      console.log(this.result);
    });

    this.loading=false;
  }


   yyyymmdd() {
    var x = new Date();
    console.log(x+"esta esssssssssssssss");
    var y = x.getFullYear().toString();
    var m = (x.getMonth() + 1).toString();
    var d = x.getDate().toString();
    (d.length == 1) && (d = '0' + d);
    (m.length == 1) && (m = '0' + m);
    var yyyymmdd = y + m + d;
    return yyyymmdd;
  }

  yyyymmdd1() {
    var x = new Date();
    var y = x.getFullYear().toString();
    var m = (x.getMonth() + 1).toString();
    var d = x.getDate().toString();
    (d.length == 1) && (d = '0' + d);
    (m.length == 1) && (m = '0' + m);
    var yyyymmdd = y + m + d;

    return this.diaSemana(d,m,y);
}

     diaSemana(anio,mes,dia){
      var dias=["dom", "lunes", "martes", "mie", "jue", "vie", "sab"];
      var dt = new Date(mes+' '+dia+', '+anio+' 12:00:00');
      var result = dias[dt.getUTCDay()];

      return result;
  }

}
