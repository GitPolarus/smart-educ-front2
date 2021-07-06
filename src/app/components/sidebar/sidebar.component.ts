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
  isAdmin: boolean = false;
  isInstructor: boolean = false;
  isCoordinator: boolean = false;
  public user : UserAccount;
  baseUrl: string;
  @Input() public display = false;

  constructor(private authService: AuthService,
    private catService:CatalogueService) {
    this.isLogin = authService.isUserLogged();
    this.user = new UserAccount();
    
    
   }

  ngOnInit() {
    
    if (this.isLogin) {
      this.user = this.authService.getUser();
      this.baseUrl = AuthService.redirectUrl;
      this.isAdmin =this.authService.isUserAdmin();
      this.isInstructor =this.authService.isUserInstructor();
      this.isCoordinator =this.authService.isUserCoordinator();
      // console.log(AuthService.redirectUrl);
      console.log(this.isAdmin);
      console.log(this.isInstructor);
      console.log(this.isCoordinator);
      
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
