import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from 'src/app/services/Global';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css'],
})
export class UserIndexComponent implements OnInit {
  public url;
  public p: any;
  public identity: any;
  public usuarios: any;

  constructor(private _userService: UserService, private _router: Router) {
    this.url = Global.url;
    this.identity = _userService.getIdentity();
  }

  // permite acceder al administrador a todos los permisos
  ngOnInit() {
    if (this.identity.role === 'ADMIN') {
      this._userService.get_users('').subscribe(
        (response) => {
          console.log(response);
          this.usuarios = response.usuarios;
        },
        (error) => {}
      );
    } else {
      this._router.navigate(['dashboard']);
    }
  }

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

        this._userService.delete_usuario(id).subscribe(
          (response) => {
            this._userService.get_users('').subscribe(
              (response) => {
                this.usuarios = response.usuarios;
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
