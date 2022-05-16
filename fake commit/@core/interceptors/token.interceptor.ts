import { Injectable } from '@angular/core';
import {LocalstorageService} from '../services/localstorage.service';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token!: string;

  constructor(
    private localStorageService: LocalstorageService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        device: 'web',
        Authorization: `Bearer ${this.localStorageService.state$.getValue()?.['token']}`,
        Accept: 'application/json'
      },
    });
    return next.handle(request);
  }
}
