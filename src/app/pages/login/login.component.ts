import { CatalogueService } from './../../services/catalogue.service';
import { UserAccount } from './../../models/useraccount.model';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoginFailed: boolean;
  isLoggedIn = false;
  user: UserAccount;
  message: string;
  public rememberMe = false;
  redirectUrl: string;

  constructor(
    public authService: AuthService,
    public router: Router,
    public msgService: MessageService,
    private catService: CatalogueService
  ) {}

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
    this.catService.postResource('auth/signin', this.user).subscribe(
      (data: any) => {
        this.user = data;
        this.authService.saveToken(this.user.token);
        this.authService.saveUser(this.user);
        console.log(this.user);

        if (this.authService.isUserAdmin()) {
          this.redirectUrl = '/admin';
        } else {
          this.redirectUrl = '/home';
        }

        this.router.navigate([this.redirectUrl]).then(() => {
          window.location.reload();
        });

        this.isLoggedIn = true;
      },
      (err) => {
        // console.log(err);
        this.message =
          'Authentication failed, please check your Email or password ';
        this.msgService.add({
          key: 'login',
          severity: 'error',
          summary: 'Sign In',
          detail: this.message,
        });
        this.isLoggedIn = false;
      }
    );
  }
}
