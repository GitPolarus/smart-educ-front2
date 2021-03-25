import { UserAccount } from './../../models/useraccount.model';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

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
  message: string;
  public rememberMe = false;

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

    if (this.authService.login(this.user)) {
      this.message = 'Authentication failed';
      // this.msgService.add({severity: 'error', summary: 'Sign In', detail: this.message});
    }else{
      this.message = 'Sucessfull authentication';
      // this.msgService.add({severity: 'success', summary: 'Sign In', detail: this.message});
    }
  }
}
