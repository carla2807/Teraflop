import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Global } from 'src/app/services/Global';
import { ProductService } from 'src/app/services/product.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css'],
})
export class ProductsEditComponent implements OnInit {
  public product: any;
  public id: any;
  public file: File;
  public imgSelect: String | ArrayBuffer | null;
  public categorias: any;
  public proveedores: any;
  public marcas: any;
  public stock: any;
  public url;
  public success_message: any;
  public error_message: any;

  constructor(
    private _route: ActivatedRoute,
    private _productService: ProductService
  ) {
    this.url = Global.url;
  }

  //Metodo persistir datos de los productos registrados
  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.id = params['id'];
      this._productService.get_producto(this.id).subscribe(
        (response) => {
          this.product = response.product;
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
        },
        (error) => {}
      );
    });
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
        .edit_producto({
          _id: this.id,
          titulo: productoForm.value.titulo,
          descripcion: productoForm.value.descripcion,
          imagen: this.file,
          img_name: this.product.imagen,
          marca: productoForm.value.marca,
          modelo: productoForm.value.modelo,
          precio: productoForm.value.precio,
          nitcategoria: productoForm.value.nitcategoria,
          nitproveedor: productoForm.value.nitproveedor,
        })
        .subscribe(
          (response) => {
            console.log(response);
            this.success_message = 'Se actualizó el producto correctamente';
          },
          (error) => {}
        );
    } else {
      this.error_message = 'Complete correctamente formulario';
    }
  }
  //Metodo
  imgSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.imgSelect = reader.result);
      reader.readAsDataURL(this.file);
    }
  }
}
