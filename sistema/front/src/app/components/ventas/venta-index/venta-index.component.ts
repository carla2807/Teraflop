import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { VentaService } from 'src/app/services/venta.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-venta-index',
  templateUrl: './venta-index.component.html',
  styleUrls: ['./venta-index.component.css'],
})
export class VentaIndexComponent implements OnInit {
  public ventas: any;
  public identity: any;

  constructor(
    private _userService: UserService,
    private _ventaService: VentaService,
    private _router: Router
  ) {
    this.identity = this._userService.getIdentity();
  }

  //si existe la identidad, sino que redirigir al login
  ngOnInit(): void {
    if (this.identity) {
      this.actualizarLista();
    } else {
      this._router.navigate(['']);
    }
  }

  avanzarEstado(item: any): void {
    this._ventaService
      .cambiar_estado({ id: item._id, estado: item.estado })
      .subscribe(
        (response) => {
          console.log(response);
          this.actualizarLista();
        },
        (error) => {}
      );
  }
  actualizarLista() {
    this._ventaService.get_ventas().subscribe(
      (response) => {
        this.ventas = response.sales;
        console.log(response);
      },
      (err) => {}
    );
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

        this._ventaService.delete_venta(id).subscribe(
          (response) => {
            this._ventaService.get_ventas().subscribe(
              (response) => {
                this.ventas = response.sales;
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
