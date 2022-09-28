import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { StockExchangeService } from '@app/@core/services/modules/stock-exchange/stock-exchange.service';

import { catchError, EMPTY, Observable } from 'rxjs';
import { ApiResponse } from '../@data/API/api';
import { StockExchange } from '../interfaces/stock-exchanges/Stock-exchange';

@Injectable({
  providedIn: 'root'
})
export class StockExhangeResolver implements Resolve<ApiResponse<StockExchange>>{
   

  constructor(private stock: StockExchangeService ,private router: Router) { }

  resolve(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot):  Observable<ApiResponse<StockExchange>>  {
    // console.log("resolver is work ",route.paramMap.get('type'))
   return this.stock.GetStockExchangeV2(route.paramMap.get('type')||'','','').pipe(
     
     catchError(() => {
       this.router.navigate([""]);
       return EMPTY
     })
   )
  }
 
 
}
