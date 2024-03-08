import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, switchMap } from 'rxjs';
import { AuthService } from './service/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authSrv: AuthService) {}

  newReq!: HttpRequest<any>;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authSrv.user$.pipe(
      take(1),
      switchMap((authData) => {
        if (!authData) {
          return next.handle(request);
        }
        this.newReq = request.clone({
          headers: request.headers.set(
            'Authorization',
            `Bearer ${authData.token}`
          ),
        });
        console.log(authData);
        console.log(authData.token);
        return next.handle(this.newReq);
      })
    );
  }
}
