import { Injectable, OnInit } from '@angular/core';
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
              private alertService: AlertService,
              ) { }


  resolve(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot):  Observable<ApiResponse<StatisticsMembersLocal>>  {
    let type = route.paramMap.get('type')|| ''
    let id = route.paramMap.get('id') || ''
    let arr=''

    // console.log("resolver is work ",id,type)
    
    if(type == "fodder") {

      arr=localStorage.getItem('stockId')!;

      return this.statistics.StatisicsMembersFodder(id,type,'','','0','').pipe(
     
        catchError((e) => {
          this.toster.showFail(e.error.error)
          this.alertService.error(e.error.error)
          // console.log(e);

          // this.router.navigate([""]);
          return EMPTY
        })
      )
        
    }else  {

      return this.statistics.StatisicsMembersLocal(id,type,'','','').pipe(
     
        catchError((e) => {
          // this.router.navigate([""]);
          this.toster.showFail(e.error.error)
          this.alertService.error(e.error.error)
          return EMPTY
        })
      )
    }

  }
 
//   async resolve1(route: ActivatedRouteSnapshot){
//     let type = route.paramMap.get('type')|| ''
//     let id = route.paramMap.get('id') || ''
//     console.log("resolver is work 1111",id,type)
    
//     if(type == "fodder") {
//       await this.statistics.StatisicsListFodder(id).subscribe(res => {

//         this.arr+=res.data?.list_members[0].id      
//         console.log('====================================');
//         console.log(this.arr);
//         console.log('====================================');
//     })
//   }
// }

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
