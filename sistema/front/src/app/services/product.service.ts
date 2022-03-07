import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http/';
import { Global } from './Global';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public url;
  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  //Para obtener productos
  get_productos(filtro: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'productos/' + filtro, {
      headers: headers,
    });
  }

  get_producto(id: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'producto/' + id, {
      headers: headers,
    });
  }

  get_categorias(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'categorias', { headers: headers });
  }

  get_proveedores(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'proveedores', { headers: headers });
  }
  get_marcas(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'marcas', { headers: headers });
  }
  //Metodo para insertar
  insert_producto(data: any) {
    const fd = new FormData();
    fd.append('titulo', data.titulo);
    fd.append('descripcion', data.descripcion);
    fd.append('imagen', data.imagen);
    fd.append('marca', data.marca);
    fd.append('modelo', data.modelo);
    fd.append('stock', data.stock);
    fd.append('precio', data.precio);
    fd.append('nitcategoria', data.nitcategoria);
    fd.append('nitproveedor', data.nitproveedor);
    return this._http.post(this.url + 'producto/registrar', fd);
  }

  //Metodo para editar
  edit_producto(data: any) {
    const fd = new FormData();
    fd.append('titulo', data.titulo);
    fd.append('descripcion', data.descripcion);
    fd.append('imagen', data.imagen);
    fd.append('marca', data.marca);
    fd.append('modelo', data.modelo);
    fd.append('stock', data.stock);
    fd.append('precio', data.precio);
    fd.append('nitcategoria', data.nitcategoria);
    fd.append('nitproveedor', data.nitproveedor);
    return this._http.put(
      this.url + 'producto/editar/' + data._id + '/' + data.img_name,
      fd
    );
  }
  //Metodo eliminar producto
  delete_producto(id: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'producto/eliminar/' + id, {
      headers: headers,
    });
  }

  insert_categoria(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + '/categoria/registrar', data, {
      headers: headers,
    });
  }

  insert_proveedor(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + '/proveedor/registrar', data, {
      headers: headers,
    });
  }
  insert_marca(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + '/marca/registrar', data, {
      headers: headers,
    });
  }

  stock_producto(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + 'producto/stock/' + data._id, data, {
      headers: headers,
    });
  }
}
