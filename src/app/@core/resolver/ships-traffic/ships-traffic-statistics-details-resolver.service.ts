import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';

import { catchError, EMPTY, Observable } from 'rxjs';
import { ShipsTrafficService } from '../../../modules/services/ships-traffic/_core/services/ships-traffic.service';
import { StatisticsDetials } from './../../interfaces/ships-traffic/ships-traffic';


@Injectable({
  providedIn: 'root'
})
export class ShipsTrafficStatisticsDetailsResolver implements Resolve<ApiResponse<StatisticsDetials>>{
   

  constructor(private ship: ShipsTrafficService ,private router: Router,) { }

  resolve(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot):  Observable<ApiResponse<StatisticsDetials>>  {
    console.log("resolver is work ",    route.params['country'])
    route.params
   return this.ship.StatisticsDetails('','', route.params['country'], route.params['id']).pipe(
     
     catchError(() => {
       this.router.navigate([""]);
       return EMPTY
     })
   )
  }
 
 
}
