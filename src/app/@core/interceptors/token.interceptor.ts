import { Injectable } from '@angular/core';
import {LocalstorageService} from '../services/auth/localstorage.service';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, finalize, } from 'rxjs';
import { ToasterService } from '@app/@core/services/toastr.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
   token!: string;

  // constructor(
  //   private localStorageService: LocalstorageService,
  // ) {}

  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   request = request.clone({
  //     setHeaders: {
  //       device: 'web',
  //       Authorization: `Bearer ${this.localStorageService.state$.getValue()?.['token']}`,
  //       Accept: 'application/json'
  //     },
  //   });
  //   return next.handle(request);
  // }


  
  constructor(
    private _loading: ToasterService,
    private localStorageService: LocalstorageService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
      setHeaders: {
        device: 'web',
        Authorization: `Bearer ${this.localStorageService.state$.getValue()?.['token']}`,
        Accept: 'application/json'
      },
    });
    this._loading.setLoading(true, request.url);
      return next.handle(request).pipe(
        finalize(() =>  this._loading.setLoading(false, request.url))
    )
}





}
