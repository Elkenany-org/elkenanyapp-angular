import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { Market } from '@app/@core/interfaces/market/home';
import { MarketService } from '@app/modules/sectors/market/_core/market.service';


import { catchError, EMPTY, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MarketHomeResolver implements Resolve<ApiResponse<Market>>{
   

  constructor(private Market: MarketService ,private router: Router) { }

  resolve(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot):Observable<ApiResponse<Market>>  {
    console.log("Market Resolver is work ",route.paramMap.get('type'))
   return this.Market.market(route.paramMap.get('type')||'').pipe(
     catchError(() => {
       this.router.navigate([""]);
       return EMPTY
     })
   )
  }
 
 
}
