import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url='http://localhost/bestdealfinder/src/app/php/login/';

  constructor(private http:HttpClient) { }

  consultar (user: any , clave:any) {
    return this.http.post(`${this.url}login.php`, {Correo: user, Clave: clave}, {headers: {
      'Content-Type': 'application/json',
    }});
   // return this.http.get (`${this.url}login.php?user=${user}&clave=${clave}`);
  }
}
