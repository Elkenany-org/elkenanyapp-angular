import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { FeedsItems, Fodder, LocalStockFodder } from '@app/@core/interfaces/stock-exchanges/Stock-exchange';
import { StockExchangeService } from '@app/@core/services/modules/stock-exchange/stock-exchange.service';
import { FormatDate } from '@app/@shared/classes/formatDate';

import { catchError, EMPTY, Observable } from 'rxjs';
// import { FeedsItems } from '../data/local-stock-fodder-sub';

@Injectable({
  providedIn: 'root'
})
export class LocalStockLocalAndFodder implements Resolve<ApiResponse<Fodder |LocalStockFodder>>{
  public today= new FormatDate().shortDate(Date())


  constructor(private stock: StockExchangeService ,private router: Router) { }

  resolve(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot):  Observable<ApiResponse<Fodder| LocalStockFodder>>  {



    if(route.paramMap.get('type_stock') === 'fodder' ){
      return this.stock.fodder(route.paramMap.get('id')|| '',this.today,'','').pipe(
        catchError(() => {
          this.router.navigate([""]);
          return EMPTY
        }))
    }else {
      return  this.stock.local(route.paramMap.get('id')|| '',this.today).pipe(
        catchError(() => {
          this.router.navigate([""]);
          return EMPTY
        }))
    }

  }
 


  
 
 
}



