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
    // let url =  this.router.url.split('/') 
    let url =  state.url.split('/') 

    // let type =  url[url.length-1] 
    let type =  url[url.length-2] 
    // console.log(type);
    
    // // console.log("resolver is work ",route.paramMap)
    // console.log(url);
    
    // let date = new Date();
    // let today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    // let from = this.subtractDays(30);

  //  return this.statistics.StatisicsSubSections(type ,from,today,'').pipe(
     
    //  catchError(() => {
      return this.statistics.StatisicsSubSections(type ,'','','').pipe(
        catchError(() => {
          this.router.navigate([""]);
          return EMPTY
        })
      )
    //  })
  //  )
   }
 



  // subtractDays(numOfDays: number, date = new Date()) {
  //   date.setDate(date.getDate() - numOfDays);
  //   let shortDate =
  //     date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

  //   return shortDate;
  // }
}
