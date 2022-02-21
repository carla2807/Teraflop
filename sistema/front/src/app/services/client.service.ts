import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http/';
import { Global } from './Global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  public url;
  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  //Metodo para obtener clientes
  get_clientes(filtro: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'clientes/' + filtro, {
      headers: headers,
    });
  }
  //Metodo para registrar cliente
  insert_cliente(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'cliente/registrar', data, {
      headers: headers,
    });
  }

  get_cliente(id: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'cliente/' + id, {
      headers: headers,
    });
  }
  update_cliente(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + 'cliente/editar/' + data._id, data, {
      headers: headers,
    });
  }
  //Metodo eliminar cliente
  delete_cliente(id: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'cliente/eliminar/' + id, {
      headers: headers,
    });
  }
}
