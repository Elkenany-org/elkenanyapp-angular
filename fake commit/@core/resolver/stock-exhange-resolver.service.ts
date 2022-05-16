import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ToasterService } from '@app/@shared/services/toastr.service';
import { StockExchangeService } from '@app/modules/sectors/stock-exchange/_core/stock-exchange.service';

import { catchError, EMPTY, Observable } from 'rxjs';
import { ApiResponse } from '../@data/API/api';
import { StockExchange } from '../interfaces/stock-exchanges/Stock-exchange';

@Injectable({
  providedIn: 'root'
})
export class StockExhangeResolver implements Resolve<ApiResponse<StockExchange>>{
   

  constructor(private stock: StockExchangeService ,private router: Router,private toster:ToasterService) { }

  resolve(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot):  Observable<ApiResponse<StockExchange>>  {
    console.log("resolver is work ",route.paramMap.get('type'))
    this.toster.loading('حاري التحميل')
   return this.stock.GetStockExchangeV2(route.paramMap.get('type')||'','1','').pipe(
     
     catchError(() => {
       this.router.navigate([""]);
       return EMPTY
     })
   )
  }
 
 
}
