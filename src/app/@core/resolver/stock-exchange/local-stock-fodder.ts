import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { FeedsItems } from '@app/@core/interfaces/stock-exchanges/Stock-exchange';
import { StockExchangeService } from '@app/@core/services/modules/stock-exchange/stock-exchange.service';

import { catchError, EMPTY, Observable } from 'rxjs';
// import { FeedsItems } from '../data/local-stock-fodder-sub';

@Injectable({
  providedIn: 'root'
})
export class LocalStockFodder implements Resolve<ApiResponse<FeedsItems>>{
   

  constructor(private stock: StockExchangeService ,private router: Router) { }

  resolve(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot):  Observable<ApiResponse<FeedsItems>>  {
    
   return this.stock.feeds_items(route.paramMap.get('id')||'').pipe(
    catchError(() => {
      this.router.navigate([""]);
      return EMPTY
    }))
  }
 
 
}



