import { UserAccount } from './../../models/useraccount.model';
import { AuthService } from './../../services/auth.service';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CatalogueService } from 'src/app/services/catalogue.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  countNumbers: any = [];
  public isLogin = false;
  public user : UserAccount;
  @Input() public display = false;
  constructor(private authService: AuthService,
    private catService:CatalogueService) {
    this.isLogin = authService.isUserLogged();
    this.user = new UserAccount();
    
    
   }

  ngOnInit() {
    if (this.isLogin) {
      this.user = this.authService.getUser();
      // console.log(this.user);
    }
    this.getCountNumbers()
  }

  onProfileClick(email): string{
    // console.log(href);
    return btoa(email);
  }

  public getCountNumbers(): void {
    this.catService.getList('all/countData').subscribe(
      (data: any) => {
        this.countNumbers = data;
        // console.log(countNumbers);
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
