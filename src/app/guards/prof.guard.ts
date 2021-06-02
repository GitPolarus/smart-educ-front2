import { AuthService } from './../services/auth.service';
import { Injectable, Input } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class ProfGuard implements CanActivate, CanActivateChild, CanLoad {
  
  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // console.log('AuthGuard#canActivate called');
    return this.checkLogin('/prof');
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;
    return this.checkLogin(url);;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  checkLogin(url: string): boolean | UrlTree {
    if (this.authService.isUserLogged() && (this.authService.isUserCoordinator() || this.authService.isUserInstructor())) { 
      // console.log('connected');
      
      return true;
     }

    // Store the attempted URL for redirecting
    AuthService.redirectUrl = url;
    console.log(AuthService.redirectUrl);
    // Redirect to the login page
     return this.router.parseUrl('/not-allowed');
    // return false;
  }

}
