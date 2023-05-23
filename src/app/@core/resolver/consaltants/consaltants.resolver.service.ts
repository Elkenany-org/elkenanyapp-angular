import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { Doctors } from '@app/@core/interfaces/consaltants/consaltants';
import { ConsaltantsService } from '@app/@core/services/modules/consaltants/consaltants.service';
import { catchError, EMPTY, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsaltantsResolver implements Resolve<ApiResponse<Doctors>> {
  constructor(private consaltants:ConsaltantsService,private router: Router){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ApiResponse<Doctors>> {
    return this.consaltants.all_doctors().pipe(
      catchError(() => {
        this.router.navigate([""]);
        return EMPTY
      })
      )
     }
   }
   