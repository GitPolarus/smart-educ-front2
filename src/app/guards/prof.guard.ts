import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class ProfGuard implements CanActivate, CanActivateChild, CanLoad{
  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log('AuthGuard#canActivate called');
    return  this.authService.isUserLogged();
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

  checkLogin(url: string): true|UrlTree {
    if (this.authService.isUserLogged() && (this.authService.isUserCoordinator() || this.authService.isUserInstructor())) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Redirect to the login page
    return this.router.parseUrl('/login');
  }

}
