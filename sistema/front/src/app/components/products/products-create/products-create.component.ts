import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../../models/Product';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.css'],
})
export class ProductsCreateComponent implements OnInit {
  public product: any;
  public file: File;
  public imgSelect: String | ArrayBuffer | null;
  public categorias: any;
  public proveedores: any;
  public marcas: any;
  public success_message: any;
  public error_message: any;

  constructor(private _productService: ProductService) {
    this.product = new Product('', '', '', '', '', '', 1, 1, '', '');
  }

  //Para mostrar lista marcas categorias proveedores registrados
  ngOnInit(): void {
    this._productService.get_categorias().subscribe(
      (response) => {
        this.categorias = response.categories;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    this._productService.get_proveedores().subscribe(
      (response) => {
        this.proveedores = response.providers;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );

    this._productService.get_marcas().subscribe(
      (response) => {
        this.marcas = response.marcas;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  success_alert() {
    this.success_message = '';
  }
  error_alert() {
    this.error_message = '';
  }
  onSubmit(productoForm: any) {
    if (productoForm.valid) {
      this._productService
        .insert_producto({
          titulo: productoForm.value.titulo,
          descripcion: productoForm.value.descripcion,
          imagen: this.file,
          marca: productoForm.value.marca,
          modelo: productoForm.value.modelo,
          stock: productoForm.value.stock,
          precio: productoForm.value.precio,
          nitcategoria: productoForm.value.nitcategoria,
          nitproveedor: productoForm.value.nitproveedor,
        })
        .subscribe(
          (response) => {
            this.success_message = 'Producto registrado';
            this.product = new Product('', '', '', '', '', '', 1, 1, '', '');
            this.imgSelect = '../../../../assets/img/default.jpg';
          },
          (error) => {}
        );
    } else {
      this.error_message = 'Complete correctamente formulario';
    }
  }

  //Metodo para seleccionar imagen
  imgSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.imgSelect = reader.result);
      reader.readAsDataURL(this.file);
    }
  }
}
