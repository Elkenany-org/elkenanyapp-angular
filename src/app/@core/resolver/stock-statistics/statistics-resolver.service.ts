import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ShipsTrafficService } from '../../services/modules/ships-trafic/ships-traffic.service';
import { Ships } from '@app/@core/interfaces/ships-traffic/ships-traffic';
import { StatisticsSubsSections } from '@app/@core/interfaces/stock-exchanges/statistics';
import { StatisticsService } from '@app/modules/sectors/stock-exchange/statistics-module/_core/statistics.service';


@Injectable({
  providedIn: 'root'
})
export class StatisticsResolver implements Resolve<ApiResponse<StatisticsSubsSections>>{
   

  constructor(private statistics: StatisticsService ,private router: Router) { }

  resolve(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot):  Observable<ApiResponse<StatisticsSubsSections>>  {
    let url =  this.router.url.split('/') 
    let type =  url[url.length-1] 
    console.log("resolver is work ",type)

   return this.statistics.StatisicsSubSections(type,'','','').pipe(
     
     catchError(() => {
       this.router.navigate([""]);
       return EMPTY
     })
   )
  }
 
 
}
