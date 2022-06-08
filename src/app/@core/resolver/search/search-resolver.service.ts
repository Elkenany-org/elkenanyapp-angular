import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ShipsTrafficService } from '../../../modules/services/ships-traffic/_core/services/ships-traffic.service';
import { Ships } from '@app/@core/interfaces/ships-traffic/ships-traffic';
import { Search } from '@app/@core/interfaces/_app/app-response';
import { SearchService } from './../../services/app/gallery/search/search.service';


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
