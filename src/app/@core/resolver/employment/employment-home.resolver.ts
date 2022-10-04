import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { Jobs } from '@app/@core/interfaces/employment/home';
import { EmploymentService } from '@app/@core/services/modules/employment/employment.service';
import { catchError, EMPTY, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmploymentHomeResolver implements Resolve<ApiResponse<Jobs>> {
  constructor(private Jobs: EmploymentService ,private router: Router) { }

  resolve(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot):Observable<ApiResponse<Jobs>>  {
    console.log("Market Resolver is work ")
   return this.Jobs.market(route.paramMap.get('type')||'','1','','').pipe(
     catchError(() => {
       this.router.navigate([""]);
       return EMPTY
     })
   )
  }
}
