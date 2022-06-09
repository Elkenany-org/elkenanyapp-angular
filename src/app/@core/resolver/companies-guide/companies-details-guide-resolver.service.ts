import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { sector } from '@app/@core/@data/app/filter-list';
import { CompaniesGuideService } from '@app/@core/services/modules/companies-guide/companies-guide.service';


import { catchError, EMPTY, Observable } from 'rxjs';
import { company } from '@app/@core/interfaces/companies-guid/co-company';

@Injectable({
  providedIn: 'root'
})
export class CompaniesDetailsResolver implements Resolve<ApiResponse<company>>{
   

  constructor(private company: CompaniesGuideService ,private router: Router ) { }

  resolve(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot):Observable<ApiResponse<company>>  {
    console.log("Companies Details Resolver is work ",route.paramMap.get('id'))



    let id:any =route.paramMap.get('id')
   return this.company.comapny(id).pipe(
     catchError(() => {
       this.router.navigate([""]);
       return EMPTY
     })
   )
  }
 
 
}
