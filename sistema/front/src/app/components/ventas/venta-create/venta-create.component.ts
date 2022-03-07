import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Global } from 'src/app/services/Global';
import { ClientService } from 'src/app/services/client.service';
import { UserService } from 'src/app/services/user.service';
import { ProductService } from 'src/app/services/product.service';
import { VentaService } from '../../../services/venta.service';
import { DetalleVenta } from '../../../models/DetalleVenta';
import {} from '../../../models/Venta';

@Component({
  selector: 'app-venta-create',
  templateUrl: './venta-create.component.html',
  styleUrls: ['./venta-create.component.css'],
})
export class VentaCreateComponent implements OnInit {
  public identity: any;
  public clientes: any;
  public venta: any = {
    idcliente: '',
  };
  public productos: any;
  public producto: any = {
    stock: '--|--',
  };
  public detalle: any = {
    idproducto: '',
  };
  public total = 0;
  public error_message: any;
  //El array almacena en cada uno de sus indices todos los detalles de la venta
  public data_detalle: Array<any> = [];

  constructor(
    //private _route: ActivatedRoute,
    private _productService: ProductService,
    private _clientService: ClientService,
    private _userService: UserService,
    private _ventaService: VentaService,
    private _router: Router
  ) {
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    if (this.identity) {
      this._clientService.get_clientes('').subscribe((response) => {
        this.clientes = response.clientes;
      });

      this._productService.get_productos('').subscribe((response) => {
        this.productos = response.productos;
      });
    } else {
      this._router.navigate(['']);
    }
  }

  get_data_producto(id: any) {
    this._productService.get_producto(id).subscribe(
      (response) => {
        this.producto = response.product;
      },
      (error) => {}
    );
  }
  close_alert() {
    this.error_message = '';
  }
  save_detalle(detalleForm: any) {
    if (detalleForm.valid) {
      //la cantidad que ingreso en la venta no puede superar la cantidad del stock actual
      if (detalleForm.value.cantidad <= this.producto.stock) {
        this.data_detalle.push({
          idproducto: detalleForm.value.idproducto,
          cantidad: detalleForm.value.cantidad,
          producto: this.producto.titulo,
          precio: this.producto.precio,
        });
        this.detalle = new DetalleVenta('', '', 0);
        this.producto.stock = '--|--';

        this.total =
          this.total +
          parseInt(this.producto.precio) * parseInt(detalleForm.value.cantidad);
        console.log(this.total);
      } else {
        this.error_message = 'No existe suficiente stock para la venta';
      }
    }
  }
  //recibe el indice del elemento, el precio y la cantidad
  eliminar(idx: any, precio: any, cantidad: any) {
    this.data_detalle.splice(idx, 1);
    this.total = this.total - parseInt(precio) * parseInt(cantidad);
  }

  onSubmit(ventaForm: any): any {
    if (ventaForm.value.idcliente != '') {
      let data = {
        client: ventaForm.value.idcliente,
        user: this.identity._id,
        detalles: this.data_detalle,
      };
      this._ventaService.save_data(data).subscribe(
        (reponse) => {
          this._router.navigate(['ventas']);
        },
        (error) => {}
      );
    } else {
    }
  }
}
