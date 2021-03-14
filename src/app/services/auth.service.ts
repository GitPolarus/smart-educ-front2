import { Injectable } from '@angular/core';
import {CatalogueService} from './catalogue.service';
import {Router} from '@angular/router';
import { UserAccount } from '../models/useraccount.model';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  user :UserAccount;

  isLoggedIn = false;
  // store the URL so we can redirect after logging in
  redirectUrl: string;
  constructor(private catService:CatalogueService, private router:Router) { }

  login(form:any):boolean {

    this.catService.postResource("auth/signin",form).subscribe((data:any)=>{

      this.user = data;
        this.saveToken(this.user.accessToken)
        this.saveUser(this.user);

        if(this.isUserAdmin()){
          this.redirectUrl = '/admin';
        }else {
          this.redirectUrl = '/user';
        }

        this.router.navigate([this.redirectUrl]).then(window.location.reload)

      this.isLoggedIn = true;
      },
      err=> {
        console.log(err)
        this.isLoggedIn = false;
      });

    return this.isLoggedIn
  }

  logout(): void {
    this.isLoggedIn = false;
    this.signOut();
    this.router.navigateByUrl("/home/login").then(window.location.reload)
  }

  reloadPage() {
    window.location.reload();

  }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser():UserAccount {
    return this.user = JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  public getUserRole(): string{
    let roles  = this.getUser().authorities[0];
    return roles['authority'];
  }

  public isUserAdmin(): boolean{
    return this.getUserRole() == "ROLE_ADMIN";
  }

  public isUserLogged(): boolean{
    return !!this.getToken();
  }
}
