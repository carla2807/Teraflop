import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http/';
import { Global } from './Global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VentaService {
  public url;
  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  get_ventas(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'ventas/', {
      headers: headers,
    });
  }

  data_venta(id: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'venta/' + id, {
      headers: headers,
    });
  }
  save_data(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'venta/registrar', data, {
      headers: headers,
    });
  }
  cambiar_estado(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'venta/cambiarestado', data, {
      headers: headers,
    });
  }

  delete_venta(id: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'venta/eliminar/' + id, {
      headers: headers,
    });
  }
}
