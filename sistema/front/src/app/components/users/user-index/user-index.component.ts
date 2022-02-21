import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/services/Global';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css'],
})
export class UserIndexComponent implements OnInit {
  public url;
  public p: any;
  public usuarios: any;

  constructor(private _userService: UserService) {
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._userService.get_users().subscribe(
      (response) => {
        this.usuarios = response.usuarios;
        console.log(response);
      },
      (error) => {}
    );
  }
}
