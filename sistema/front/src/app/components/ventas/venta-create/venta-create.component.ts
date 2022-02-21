import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Global } from 'src/app/services/Global';
import { VentaService } from 'src/app/services/venta.service';
import { ClientService } from 'src/app/services/client.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-venta-create',
  templateUrl: './venta-create.component.html',
  styleUrls: ['./venta-create.component.css'],
})
export class VentaCreateComponent implements OnInit {
  public id: any;
  public identity: any;
  public venta: any;
  public detalle_venta: any;
  private _router: Router;

  constructor(
    private _route: ActivatedRoute,
    private _ventaService: VentaService,
    private _clientService: ClientService,
    private _userService: UserService
  ) {
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    if (this.identity) {
      this._route.params.subscribe((params) => {
        this.id = params['id'];

        this._ventaService.data_venta(this.id).subscribe((response) => {
          console.log('ventas:');
          this.venta = response.data.venta;
          this.detalle_venta = response.data.detalles;
          console.log(this.venta);
          this._clientService
            .get_cliente(this.venta.client)
            .subscribe((resp) => {
              //consulta datos de cliente por id
              console.log('client service:');
              console.log(resp);
              this.venta.client = resp.client;
            });
        });
      });
    } else {
      this._router.navigate(['']);
    }
  }
}
