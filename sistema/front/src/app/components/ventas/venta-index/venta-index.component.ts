import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { VentaService } from 'src/app/services/venta.service';
import { Router, ActivatedRoute } from '@angular/router';

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
      this._ventaService.get_ventas().subscribe(
        (response) => {
          this.ventas = response.sales;
          console.log(response);
        },
        (err) => {}
      );
    } else {
      this._router.navigate(['']);
    }
  }
}
