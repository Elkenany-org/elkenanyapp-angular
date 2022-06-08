import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { catchError, EMPTY, Observable } from 'rxjs';
import { MagazineService } from '@app/modules/services/magazine/_core/services/magazine.service';
import { Magazine } from '@app/@core/interfaces/magazine/magazine';
import { AdDetails } from '@app/@core/interfaces/market/ad-detials';
import { MarketService } from '@app/modules/sectors/market/_core/market.service';


@Injectable({
  providedIn: 'root'
})
export class MarketwDetailsResolver implements Resolve<ApiResponse<AdDetails>>{
   

  constructor(private market: MarketService,private router: Router) { }

  resolve(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot):  Observable<ApiResponse<AdDetails>>  {
    console.log("resolver is work ",route.paramMap.get('id'))
    let id:any =route.paramMap.get('id')
   return this.market.ad_details(id).pipe(
     
     catchError(() => {
       this.router.navigate([""]);
       return EMPTY
     })
   )
  }
 
 
}
