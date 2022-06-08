import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { CompaniesHome } from '@app/@core/interfaces/companies-guid/co-home-data';


import { catchError, EMPTY, Observable } from 'rxjs';
import { CompaniesGuideService } from '../../../modules/sectors/companies-guide/_core/services/companies-guide.service';

@Injectable({
  providedIn: 'root'
})
export class CompaniesGuideHomeResolver implements Resolve<ApiResponse<CompaniesHome>>{
   

  constructor(private stock: CompaniesGuideService ,private router: Router,) { }

  resolve(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot):Observable<ApiResponse<CompaniesHome>>  {
    console.log("Companies Guide Resolver is work ",route.paramMap.get('type'))

   return this.stock.CompaniesHome(route.paramMap.get('type')||'','1','').pipe(
     catchError(() => {
       this.router.navigate([""]);
       return EMPTY
     })
   )
  }
 
 
}
