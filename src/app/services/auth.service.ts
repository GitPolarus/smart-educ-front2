import { MessageService } from 'primeng/api';
import { Role } from './../models/role.model';
import { Injectable, NgModule } from '@angular/core';
import { CatalogueService } from './catalogue.service';
import { Router } from '@angular/router';
import { UserAccount } from '../models/useraccount.model';
import { Component } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: UserAccount;

  isLoggedIn = false;
  // store the URL so we can redirect after logging in
  static redirectUrl: string= '';
  constructor(
    private catService: CatalogueService,
    private router: Router,
  ) {}

  login(form: UserAccount): boolean {
    this.catService.postResource('auth/signin', form).subscribe(
      (data: any) => {
        this.user = data;
        this.saveToken(this.user.token);
        this.saveUser(this.user);
        console.log(this.user);

        if (this.isUserAdmin()) {
          AuthService.redirectUrl = '/admin';
        } else if(this.isUserCoordinator() || this.isUserInstructor()) {
          AuthService.redirectUrl = '/prof';
        } else {
          console.log('not connected');
          AuthService.redirectUrl = '';
        }


        this.isLoggedIn = true;
        
        this.router.navigate([AuthService.redirectUrl]).then(() => {
          this.reloadPage();
        });
      },
      (err) => {
        console.log(err);
        // this.show = false;
        // console.log('failed authentication');
        this.isLoggedIn = false;
      }
    );

    return this.isLoggedIn;
  }

  public logout(): void {
    this.isLoggedIn = false;
    this.signOut();
    this.router.navigateByUrl('/login').then(() => {
      this.reloadPage();
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): UserAccount {
    return (this.user = JSON.parse(sessionStorage.getItem(USER_KEY)));
  }

  public getUserRole(r: string): string {
    const roles = this.getUser().roles;
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < roles.length; index++) {
      const role = roles[index];
      if (role.name == r) {
        return role.name;
      } else {
        continue;
      }
    }
  }

  public isUserAdmin(): boolean {
    return this.getUserRole('ROLE_ADMIN') == 'ROLE_ADMIN';
  }

  public isUserCoordinator(): boolean {
    return this.getUserRole('ROLE_COORDINATOR') == 'ROLE_COORDINATOR';
  }

  public isUserInstructor(): boolean {
    return this.getUserRole('ROLE_INSTRUCTOR') == 'ROLE_INSTRUCTOR';
  }

  public isUserLogged(): boolean {
    return !!this.getToken();
  }
}
