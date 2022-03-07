import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http/'; //Sirve para comunicar Front con Back
import { Global } from './Global';
import { User } from '../models/User';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  //Creo variable url, la inicializo en el constructor,le asigno Global que guarda url de API
  public url;
  public user;
  public token: any;
  public identity: any;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
    this.user = new User('', '', '', '', '', ''); //creo instancia modelo user, las comillas son los atributos
  }
  login(user: any, getToken: boolean): Observable<any> {
    const json = user;

    if (getToken != null) {
      user.gettoken = true;
    }
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login', json, { headers: headers });
  }
  getToken(): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      this.token = token;
    } else {
      this.token = null;
    }

    return this.token;
  }
  getIdentity(): Observable<any> {
    const identity = localStorage.getItem('identity');
    if (identity) {
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return JSON.parse(this.identity);
  }
  get_users(filtro: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'usuarios' + filtro, {
      headers: headers,
    });
  }

  insert_usuario(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'registrar', data, {
      headers: headers,
    });
  }
  get_user(id: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'user/' + id, { headers: headers });
  }

  update_usuario(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + 'user/editar/' + data._id, data, {
      headers: headers,
    });
  }

  delete_usuario(id: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'user/eliminar/' + id, {
      headers: headers,
    });
  }
}
