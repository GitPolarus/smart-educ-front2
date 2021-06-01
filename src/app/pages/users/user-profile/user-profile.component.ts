import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserAccount } from 'src/app/models/useraccount.model';
import { UserProfile } from 'src/app/models/userProfile.model';
import { CatalogueService } from 'src/app/services/catalogue.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: UserAccount = new UserAccount();
  profile: UserProfile = new UserProfile();

  constructor(private catService: CatalogueService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    let email = atob(this.route.snapshot.paramMap.get('email'));
    this.getUser(email);
    
  }

  public getUser(email): void {
    this.catService.getList('users/search/findByEmail?email=' + email).subscribe(
      (data: any) => {
         this.user = data;
         console.log(this.user);
         this.getUserProfile(this.user._links.userProfile.href)
      },
      (err) => {
        console.error(err);
      }
    );
  }
  
  public getUserProfile(href): void {
    this.catService.getResource(href).subscribe(
      (data: any) => {
         this.profile = data;
         console.log(this.profile);
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
