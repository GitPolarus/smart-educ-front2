import { AuthService } from './../../services/auth.service';
import { MenuItem } from 'primeng/api';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.scss'],
})
export class VisitorComponent implements OnInit {
  boards: MenuItem[];
  items: MenuItem[];
  isLogin = false;
  isAdmin = false;

  constructor(private authService: AuthService){
    this.isLogin = authService.isUserLogged();
  }

  ngOnInit() {

    if (this.isLogin) {
      this.isAdmin = this.authService.isUserAdmin();
    }

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

    this.boards = [
      {label: 'Update', icon: 'pi pi-refresh', command: () => {
          // this.update();
      }},
      {label: 'Delete', icon: 'pi pi-times', command: () => {
          // this.delete();
      }},
      {label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io'},
      {separator: true},
      {label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup']}
  ];
  }

  public logout(): void {
    console.log('logout');

    this.authService.logout();
  }
}
