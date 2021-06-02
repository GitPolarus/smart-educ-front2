import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.scss']
})
export class ProfessorComponent implements OnInit {
  boards: MenuItem[];
  items: MenuItem[];
  isLogin = false;
  isAdmin = false;

  constructor(private authService: AuthService){
    this.isLogin = authService.isUserLogged();
    AuthService.redirectUrl = '/prof';
  }

  ngOnInit() {

    if (this.isLogin) {
      this.isAdmin = this.authService.isUserAdmin();
    }

  }

  public logout(): void {
    console.log('logout');

    this.authService.logout();
  }

}
