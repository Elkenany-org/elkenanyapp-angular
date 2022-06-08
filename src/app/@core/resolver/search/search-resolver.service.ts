import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Search } from '@app/@core/interfaces/_app/app-response';
import { SearchService } from '@app/@core/services/modules/search/search.service';


@Injectable({
  providedIn: 'root'
})
export class SearchResolver implements Resolve<ApiResponse<Search>>{
   

  constructor(private search: SearchService ,private router: Router) { }

  resolve(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot):  Observable<ApiResponse<Search>>  {
    console.log("resolver is work ",route.paramMap.get('word'))
   return this.search.search(route.paramMap.get('word')||'').pipe(
     
     catchError(() => {
       this.router.navigate([""]);
       return EMPTY
     })
   )
  }
 
 
}
