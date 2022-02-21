import { Component, OnInit } from '@angular/core';
import { Color } from '@swimlane/ngx-charts';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-index',
  templateUrl: './cliente-index.component.html',
  styleUrls: ['./cliente-index.component.css'],
})
export class ClienteIndexComponent implements OnInit {
  public clientes: any;
  public p: any;

  constructor(private _clientService: ClientService) {
    this._clientService.get_clientes(``).subscribe(
      (response) => {
        this.clientes = response.clientes;
        console.log(this.clientes);
      },
      (error) => {}
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

        this._clientService.delete_cliente(id).subscribe(
          (response) => {
            this._clientService.get_clientes('').subscribe(
              (response) => {
                this.clientes = response.clientes;
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
  ngOnInit(): void {}
}
