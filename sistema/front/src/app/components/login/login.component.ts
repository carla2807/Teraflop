import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user;
  public token: any;
  public identity: any;
  public data_error: any;

  constructor(private _router: Router, private _userService: UserService) {
    this.user = new User('', '', '', '', '', '');
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    if (this.identity) {
      this._router.navigate(['products']);
    }
  }
  close_alert() {
    this.data_error = '';
  }

  login(loginForm: any) {
    if (loginForm.valid) {
      this._userService.login(this.user, this.token).subscribe(
        (response) => {
          this.token = response.jwt;
          localStorage.setItem('token', this.token);

          this._userService.login(this.user, true).subscribe((response) => {
            localStorage.setItem('identity', JSON.stringify(response.user));
            this._router.navigate(['products']);
          });
        },
        (error) => {
          this.data_error = error.error.message;
        }
      );
    } else {
    }
  }
}
