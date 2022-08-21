import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ShipsTrafficService } from '../../services/modules/ships-trafic/ships-traffic.service';
import { Ships } from '@app/@core/interfaces/ships-traffic/ships-traffic';
import { StatisticsMembersLocal, StatisticsSubsSections } from '@app/@core/interfaces/stock-exchanges/statistics';
import { StatisticsService } from '@app/modules/sectors/stock-exchange/statistics-module/_core/statistics.service';
import { ToasterService } from '../../services/toastr.service';
import { AlertService } from '../../services/alert.service';


@Injectable({
  providedIn: 'root'
})
export class StatisticsMembersResolver implements Resolve<ApiResponse<StatisticsMembersLocal>>{
   

  constructor(private statistics: StatisticsService,
              private router: Router,
              private toster: ToasterService,
              private alertService: AlertService
              ) { }

  resolve(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot):  Observable<ApiResponse<StatisticsMembersLocal>>  {
    let type = route.paramMap.get('type')|| ''
    let id = route.paramMap.get('id') || ''
    console.log("resolver is work ",id,type)
    if(type == "fodder") {
      let from =this.subtractDays(30)
      let to = this.subtractDays(0)
      console.log('====================================');
      console.log(from , to);
      console.log('====================================');
      return this.statistics.StatisicsMembersFodder(id,type,from,to,'').pipe(
     
        catchError((e) => {
          this.toster.showFail(e.error.error)
          this.alertService.error(e.error.error)
          console.log(e);
          
          // this.router.navigate([""]);
          return EMPTY
        })
      )
        
    }else  {

      return this.statistics.StatisicsMembersLocal(id,type,'','','').pipe(
     
        catchError((e) => {
          // this.router.navigate([""]);
          this.alertService.error(e.error.error)

          return EMPTY
        })
      )
    }

  }
 

  subtractDays(numOfDays: number, date = new Date()) {
    date.setDate(date.getDate() - numOfDays);
    let shortDate;
    if(date.getMonth() + 1 < 10){
      shortDate = date.getFullYear() + '-0' + (date.getMonth() + 1) + '-' + date.getDate();
    }
    else{
    shortDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    }
    return shortDate;
  }
 
}
