import { Component, OnInit, Pipe } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Global } from 'src/app/services/Global';
import Swal from 'sweetalert2';
declare const jQuery: any;
declare const $: any;

@Component({
  selector: 'app-products-index',
  templateUrl: './products-index.component.html',
  styleUrls: ['./products-index.component.css'],
})
export class ProductsIndexComponent implements OnInit {
  public products: any;
  public url;
  public filtroText: any;
  public categorias: any;
  public proveedores: any;
  public nombre_catText: any;
  public descripcion_catText: any;
  public nombre_provText: any;
  public direccion_provText: any;
  public p: any;

  constructor(private _productService: ProductService) {
    this.url = Global.url;
  }

  ngOnInit(): void {
    //Para listar productos
    this._productService.get_productos(``).subscribe(
      (response) => {
        this.products = response.productos;
        console.log(this.products);
      },
      (error) => {}
    );
    this._productService.get_categorias().subscribe(
      (response) => {
        this.categorias = response.categories;
      },
      (error) => {}
    );

    this._productService.get_proveedores().subscribe(
      (response) => {
        this.proveedores = response.providers;
      },
      (error) => {}
    );
  }
  //Metodo para filtrar producto
  search(searchForm: any) {
    this._productService.get_productos(searchForm.value.filtro).subscribe(
      (response) => {
        this.products = response.productos;
      },
      (error) => {}
    );
  }

  //Metodo guardar e insertar categoria
  save_cat(categoriaForm: any) {
    if (categoriaForm.valid) {
      this._productService
        .insert_categoria({
          nombre: categoriaForm.value.nombre_cat,
          descripcion: categoriaForm.value.descripcion_cat,
        })
        .subscribe(
          (response) => {
            this._productService.get_categorias().subscribe(
              (response) => {
                this.categorias = response.categories;
                $('#modal-save-categoria').modal('hide');
              },
              (error) => {}
            );
          },
          (error) => {}
        );
    }
  }
  //Metodo guardar e insertar proveedor

  save_prov(proveedorForm: any) {
    if (proveedorForm.valid) {
      this._productService
        .insert_proveedor({
          nombre: proveedorForm.value.nombre_prov,
          direccion: proveedorForm.value.descripcion_prov,
        })
        .subscribe(
          (response) => {
            this._productService.get_proveedores().subscribe(
              (response) => {
                this.proveedores = response.providers;
                $('#modal-save-proveedor').modal('hide');
              },
              (error) => {}
            );
          },
          (error) => {}
        );
    }
  }
  //Metodo eliminar
  eliminar(id: any) {
    Swal.fire({
      title: 'Estas seguro de eliminarlo?',
      text: 'Eliminación!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Registro eliminado!',
          'Se elimino correctamente.',
          'success'
        );

        this._productService.delete_producto(id).subscribe(
          (response) => {
            this._productService.get_productos('').subscribe(
              (response) => {
                this.products = response.productos;
              },
              (error) => {}
            );
          },
          (error) => {}
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire('Cancelado', 'Se cancelo la solicitud :)', 'error');
      }
    });
  }
}
