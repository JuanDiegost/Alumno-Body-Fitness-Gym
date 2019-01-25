import {Sort} from '@angular/material';

export class AppComponentTableServices {
  // displayedColumns = ['name', 'value'];
  dataSource = [
    {name: 'Mensualidad acondicionamiento físico', value: '60.000'},
    {name: 'Mensualidad de spinning', value: '80.000'},
    {name: 'Mensualidad con acceso total al gimnasio', value: '100.000'},
    {name: 'Mensualidad para integrante de club deportivo', value: '45.000'},
    {name: 'Mensualidad para grupos de 2 o más', value: '55.000 c/u'},
    {name: 'Mensualidad estudiante', value: '50.000'},
    {name: 'Quincenal', value: '40.000'},
    {name: 'Mensualidad entrenamiento personal', value: '450.000'},
    {name: '2 meses', value: '110.000'},
    {name: '3 meses', value: '150.000'},
    {name: '6 meses', value: '270.000'},
    {name: '1 año', value: '480.000'},
    {name: 'Sesión', value: '6.000'},
    {name: 'Sesión para integrante de club deportivo', value: '5.000'},
    {name: 'Sesión de Spinning', value: '6.000'},
    {name: 'Tarjeta ejecutiva de 5 clases', value: '26.000'},
    {name: 'Tarjeta ejecutiva de 10 clases', value: '50.000'},
    {name: 'Tarjeta ejecutiva de 15 clases', value: '70.000'},
    {name: 'Tarjeta ejecutiva de 20 clases', value: '90.000'},
    {name: 'Tarjeta ejecutiva de 30 clases', value: '120.000'},
  ];

  constructor() {
    this.dataSource = this.dataSource.slice();
  }

  sortData(sort: Sort) {
    const data = this.dataSource.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = data;
      return;
    }

    this.dataSource = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'value': return this.compare(a.value, b.value, isAsc);
        default: return 0;
      }
    });
  }

  compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
