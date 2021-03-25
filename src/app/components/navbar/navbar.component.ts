import { AuthService } from './../../services/auth.service';
import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[];
  isLogin = false;
  constructor(private authService: AuthService) {
    this.isLogin = authService.isUserLogged();
    console.log(this.isLogin);
  }

  ngOnInit() {
    this.items = [

      {
        label: 'Smart Education',
        // icon: 'pi pi-fw pi-home',
        routerLink: ['/home'],
      },
      {
        icon: 'pi pi-fw pi-list',
        command: (event)=>{
          this.onMenuIconClick(event);
        }
      },
      {
        label: 'Syllabi',
        icon: 'pi pi-fw pi-book',
        routerLink: ['/syllabi'],
      },
    ];
  }

  logout() {
    console.log('logout');

    this.authService.logout();
  }

  public onMenuIconClick(event: any){
    console.log("click hide");

  }
}
