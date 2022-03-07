import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  public id: any;
  public user: any;
  public passwordText: any;
  public success_message: any;
  public identity: any;

  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _router: Router
  ) {
    this.identity = _userService.getIdentity();
  }
  success_alert() {
    this.success_message = '';
  }
  onSubmit(usuarioForm: any) {
    if (usuarioForm.valid) {
      this._userService
        .update_usuario({
          _id: this.id,
          nombre: usuarioForm.value.nombre,
          apellido: usuarioForm.value.apellido,
          email: usuarioForm.value.email,
          role: usuarioForm.value.role,
        })
        .subscribe(
          (response) => {
            this.success_message = 'Datos actualizados';
          },
          (error) => {}
        );
    }
  }

  ngOnInit(): void {
    console.log(this.identity);
    if (this.identity.role === 'ADMIN') {
      this._route.params.subscribe((params) => {
        this.id = params['id'];
        console.log(this.id);
        this._userService.get_user(this.id).subscribe(
          (response) => {
            this.user = response.user;
          },
          (error) => {}
        );
      });
    } else {
      this._router.navigate(['dashboard']); //Si no es ADMIN lo redirige
    }
  }
}
