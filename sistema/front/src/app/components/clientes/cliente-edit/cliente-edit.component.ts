import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.css'],
})
export class ClienteEditComponent implements OnInit {
  public id: any;
  public cliente: any = {};
  public success_message: any;
  public error_message: any;

  constructor(
    private _route: ActivatedRoute,
    private _ClientService: ClientService
  ) {}

  //Metodo persistir datos de los clientes registrados
  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.id = params['id'];
      this._ClientService.get_cliente(this.id).subscribe(
        (response) => {
          console.log(response);
          this.cliente = response.client;
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

  onSubmit(clienteForm: any) {
    if (clienteForm.valid) {
      this._ClientService
        .update_cliente({
          _id: this.id,
          nombre: clienteForm.value.nombre,
          apellido: clienteForm.value.apellido,
          email: clienteForm.value.email,
          direccion: clienteForm.value.direccion,
          telefono: clienteForm.value.telefono,
          ciudad: clienteForm.value.ciudad,
          codigopostal: clienteForm.value.codigopostal,
          pais: clienteForm.value.pais,
        })
        .subscribe(
          (response) => {
            console.log(response);
            this.success_message = 'Datos actualizados';
          },
          (error) => {}
        );
    } else {
      this.error_message = 'Complete correctamente formulario';
    }
  }
}
