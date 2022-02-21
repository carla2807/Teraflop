import { Injectable } from '@angular/core';
interface Ventas {
  name: string;
  value: number;
}
@Injectable({
  providedIn: 'root',
})
export class EstadisticaService {
  //constructor() { }

  private data: Ventas[] = [
    {
      name: 'Procesador',
      value: 2,
    },
    {
      name: 'Mouses',
      value: 3,
    },
    {
      name: 'Teclados',
      value: 1,
    },
    {
      name: 'Notebooks',
      value: 5,
    },
  ];

  get ventaData() {
    return this.data;
  }
}
