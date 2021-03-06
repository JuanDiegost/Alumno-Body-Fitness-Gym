import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Constants} from '../../util/Constants'

// import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class ServicePageHome {

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string) {
    return this.httpClient.get(Constants.API_TEXT+'/login/alumno/'+username+"/"+password);
  }

  loginTrainer(username: string, password: string) {
    return this.httpClient.get(Constants.API_TEXT+'/login/entrenador/' + username + '/' + password);
  }

  getRates() {
    //return this.httpClient.get('/apirest/cities').pipe(map(data => JSON.parse(JSON.stringify(data['0']))));
  }

  getNews() {
    // return this.httpClient.get('http://localhost/apirest/cities').pipe(map(data => JSON.parse(JSON.stringify(data["0"]))));
  }

  read(url) {
    return this.httpClient.get(url);
  }
}
