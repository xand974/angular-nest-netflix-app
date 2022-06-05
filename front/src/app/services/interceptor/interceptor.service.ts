// src/app/services/interceptor.service.ts
import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

export class HttpError {
  static BadRequest = 400;
  static Unauthorized = 401;
  static Forbidden = 403;
  static NotFound = 404;
  static TimeOut = 408;
  static Conflict = 409;
  static InternalServerError = 500;
}

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}
  handleError(err: HttpErrorResponse) {
    return throwError(() => {
      switch (err.status) {
        case HttpError.InternalServerError:
        case HttpError.Forbidden:
          const _router = this.injector.get(Router);
          _router.navigate(['/error']);
          break;
      }
      throw err;
    });
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(this.handleError));
  }
}
