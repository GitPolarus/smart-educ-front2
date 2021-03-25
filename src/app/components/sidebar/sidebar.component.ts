import { UserAccount } from './../../models/useraccount.model';
import { AuthService } from './../../services/auth.service';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public isLogin = false;
  public user : UserAccount;
  @Input() public display = false;
  constructor(private authService: AuthService) {
    this.isLogin = authService.isUserLogged();
    this.user = new UserAccount();
   }

  ngOnInit() {
    if (this.isLogin) {
      this.user = this.authService.getUser();
    }
  }

}
