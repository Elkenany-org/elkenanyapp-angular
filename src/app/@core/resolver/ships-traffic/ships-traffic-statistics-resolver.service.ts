import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';

import { catchError, EMPTY, Observable } from 'rxjs';
import { ShipsTrafficService } from '../../../modules/services/ships-traffic/_core/services/ships-traffic.service';
import { StatisticsShips } from '@app/@core/interfaces/ships-traffic/ships-traffic';


@Injectable({
  providedIn: 'root'
})
export class ShipsTrafficStatisticsResolver implements Resolve<ApiResponse<StatisticsShips>>{
   

  constructor(private ship: ShipsTrafficService ,private router: Router) { }

  resolve(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot):  Observable<ApiResponse<StatisticsShips>>  {
    console.log("resolver is work ",route.paramMap.get('type'))
   return this.ship.Statistics().pipe(
     
     catchError(() => {
       this.router.navigate([""]);
       return EMPTY
     })
   )
  }
 
 
}
