import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth-service/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { LoadingService } from './loading-service/loading.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object,
    private _loading: LoadingService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //console.log('Interceptor triggered for URL:', request.url);
    this._loading.setLoading(true, request.url);
    // Solo procesar en el cliente (browser)
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running in browser context');
      const token = this.authService.getToken();
      console.log('Token available:', !!token);

      if (token) {
        console.log('Adding authorization header');
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    } else {
      console.log('Running in server context - skipping token injection');
    }

    return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 && isPlatformBrowser(this.platformId)) {
            this._loading.setLoading(false, request.url);
            this.authService.clearAuth();
            this.router.navigate(['/login']);
          }
          return throwError(() => error);
        }),
        map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
          if (evt instanceof HttpResponse) {
            this._loading.setLoading(false, request.url);
          }
          return evt;
        })
      );
  }
}