import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { ToasterService } from '@app/@shared/services/toastr.service';
import { StockExchangeService } from '@app/modules/sectors/stock-exchange/_core/stock-exchange.service';

import { catchError, EMPTY, Observable } from 'rxjs';
import { ShipsTrafficService } from './../../../modules/services/ships-traffic/_core/services/ships-traffic.service';
import { Ships } from '@app/@core/interfaces/ships-traffic/ships-traffic';


@Injectable({
  providedIn: 'root'
})
export class ShipsTrafficResolver implements Resolve<ApiResponse<Ships>>{
   

  constructor(private ship: ShipsTrafficService ,private router: Router,private toster:ToasterService) { }

  resolve(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot):  Observable<ApiResponse<Ships>>  {
    console.log("resolver is work ",route.paramMap.get('type'))
    this.toster.loading('حاري التحميل')
   return this.ship.ships('').pipe(
     
     catchError(() => {
       this.router.navigate([""]);
       return EMPTY
     })
   )
  }
 
 
}
