import { UserAccount } from './../../models/useraccount.model';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoginFailed: boolean;
  isLoggedIn = false;
  user: UserAccount;

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit(): void {
    this.user = new UserAccount();
    this.isLoggedIn = this.authService.isUserLogged();
    // console.log(this.authService.isUserAdmin);
    // console.log('user coord '+this.authService.isUserCoordinator);
    // console.log('user inst '+this.authService.isUserInstructor);

    if (this.isLoggedIn) {
      this.router.navigate(['/home']);
    }
  }

  public onSubmit(): void {
    console.log(this.user);

    this.authService.login(this.user);
  }
}
