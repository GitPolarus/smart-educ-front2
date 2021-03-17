import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../services/auth.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: AuthService) {
    // console.log('call auth interceptor');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
    }

    return next.handle(authReq);
  }
}

export const
  authInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ];

