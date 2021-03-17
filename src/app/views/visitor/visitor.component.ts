import { AuthService } from './../../services/auth.service';
import { MenuItem } from 'primeng/api';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.scss'],
})
export class VisitorComponent implements OnInit {
  items: MenuItem[];
  isLogin = false;

  constructor(private authService: AuthService){
    this.isLogin = authService.isUserLogged();
    console.log(this.isLogin);
  }

  ngOnInit() {

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: '/home',
      },
      {
        label: 'Syllabi',
        icon: 'pi pi-fw pi-book',
        routerLink: '/syllabi',
      },
    ];
  }

  logout() {
    console.log('logout');

    this.authService.logout();
  }
}
