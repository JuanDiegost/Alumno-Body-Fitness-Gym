import { Component, OnInit } from '@angular/core';
import{HorarioService} from './../services/horario/horario.service'
@Component({
  selector: 'app-student-schedule',
  templateUrl: './student-schedule.component.html',
  styleUrls: ['./student-schedule.component.css']
})
// @ts-ignore
export class StudentScheduleComponent implements OnInit {
  tableData: object[] = [
    { lunes: 'Mark', martes: 'Otto', miercoles: '', jueves: 'markotto@gmail.com', viernes: 'USA', sabado: 'San Francisco',domingo:'' },
    { lunes: '', martes: 'Thornton', miercoles: '', jueves: 'jacobt@gmail.com', viernes: 'France', sabado: 'Paris',domingo:''  },
    { lunes: 'Larry', martes: 'the Bird', miercoles: '', jueves: '', viernes: 'Germany', sabado: 'Berlin' ,domingo:'' },
    { lunes: '', martes: 'Topolski', miercoles: '@P_Topolski', jueves: 'ptopolski@gmail.com', viernes: 'Poland', sabado: 'Warsaw',domingo:''  },
    { lunes: 'Anna', martes: 'Doe', miercoles: '@andy', jueves: 'annadoe@gmail.com', viernes: 'Spain', sabado: 'Madrid',domingo:''  }
  ];
  private sorted = false;
  listaHoraio;
  dia;
  dia1;

  constructor(public _horarioService: HorarioService,) { }

  ngOnInit() {
    this._horarioService.getHorario().subscribe(data => {
      this.listaHoraio= data;
      console.log(this.listaHoraio);
      this.dia = this.yyyymmdd();
      this.dia1=this.yyyymmdd1();
    });
  
  }

  sortBy(by: string | any): void {

    this.tableData.sort((a: any, b: any) => {
      if (a[by] < b[by]) {
        return this.sorted ? 1 : -1;
      }
      if (a[by] > b[by]) {
        return this.sorted ? -1 : 1;
      }

      return 0;
    });

    this.sorted = !this.sorted;
  }
   yyyymmdd() {
    var x = new Date();
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

     diaSemana(dia,mes,anio){
      var dias=["dom", "lun", "mar", "mie", "jue", "vie", "sab"];
      var dt = new Date(mes+' '+dia+', '+anio+' 12:00:00');
      var result = dias[dt.getUTCDay()];  
      console.log(result);
      return result;  
  }

}
