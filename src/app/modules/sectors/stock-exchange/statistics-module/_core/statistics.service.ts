import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/@core/@data/API/api';
import { Observable } from 'rxjs';
// import { StatisicsMembers, StatisicsMembersDetials, StatisicsStocksDetials, StatisicsSubSections, StatisticsMember } from './statistics';
import { StatisticsMember, StatisticsSubsSections } from './statistics';
import {environment as env} from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http:HttpClient) { }


   // ----------------------------------------- < statistics > -----------------------------------------------//

   StatisicsMembers(type:string, from:string, to:string, id:string, mem_id:string):Observable<ApiResponse<StatisticsMember>> {
    return this.http.get<ApiResponse<StatisticsMember>>(`${env.ApiUrl}/localstock/statistics-stock-members?type=${type}&id=${id}`)
  }

  // StatisicsMembersDetials(type:string, from:string, to:string, id:string, mem_id:string):Observable<ApiResponse<StatisicsMembersDetials>> {
  //   return this.http.get<ApiResponse<StatisicsMembersDetials>>(`${env.ApiUrl}/localstock/statistics-detials?type=fodder&id=751`)
  // }

  StatisicsSubSections(type:string, from:string, to:string, id:string):Observable<ApiResponse<StatisticsSubsSections>> {
    return this.http.get<ApiResponse<StatisticsSubsSections>>(`${env.ApiUrl}/localstock/statistics-stock-sections?type=${type}&from=${from}&to=${to}&id=${id}`)
  }

  // StatisicsStocksDetials(type:string, search:string):Observable<ApiResponse<StatisicsStocksDetials>> {
  //   return this.http.get<ApiResponse<StatisicsStocksDetials>>(`${env.ApiUrl}/localstock/statistics-detials-local-stock?id=2`)
  // }
  
}
