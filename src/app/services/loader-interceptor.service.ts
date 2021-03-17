import { Injectable } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoaderService} from './loader.service';
import {AuthInterceptor} from '../helpers/auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {

  private requests: HttpRequest<any>[] = [];


  constructor(private loaderService: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.requests.push(req);

    // console.log("No of requests--->" + this.requests.length);

    this.loaderService.isLoading.next(true);
    return Observable.create(observer => {
      const subscription = next.handle(req)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(req);
              observer.next(event);
            }
          },
          err => {
            // alert('error' + err);
            this.removeRequest(req);
            observer.error(err);
          },
          () => {
            this.removeRequest(req);
            observer.complete();
          });
      // remove request from queue when cancelled
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.isLoading.next(this.requests.length > 0);
  }
}

export const
  loaderInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true}
  ];
