import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit {
  public usuarios: any;
  public success_message: any;

  constructor(private _userService: UserService) {
    this.usuarios = new User('', '', '', '', '', '');
  }
  success_alert() {
    this.success_message = '';
  }
  // Metodo registrar usuario
  onSubmit(usuarioForm: any) {
    if (usuarioForm.valid) {
      //console.log(usuarioForm.value);
      this._userService
        .insert_usuario({
          nombre: usuarioForm.value.nombre,
          apellido: usuarioForm.value.apellido,
          email: usuarioForm.value.email,
          password: usuarioForm.value.password,
          role: usuarioForm.value.role,
        })
        .subscribe(
          (response) => {
            this.usuarios = new User('', '', '', '', '', '');
            this.success_message = 'Usuario registrado';
            console.log(response);
          },
          (error) => {}
        );
    }
  }

  ngOnInit(): void {}
}
