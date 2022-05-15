import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/@core/@data/API/api';
import { Observable } from 'rxjs';
// import { StatisicsMembers, StatisicsMembersDetials, StatisicsStocksDetials, StatisicsSubSections, StatisticsMember } from './statistics';
import { StatisticsMember } from './statistics';
import {environment as env} from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http:HttpClient) { }


   // ----------------------------------------- < statistics > -----------------------------------------------//

   StatisicsMembers(type:string, from:string, to:string, id:string, mem_id:string):Observable<ApiResponse<StatisticsMember>> {
    return this.http.get<ApiResponse<StatisticsMember>>(`${env.ApiUrl}/localstock/statistics-stock-members?type=local&id=1`)
  }

  // StatisicsMembersDetials(type:string, from:string, to:string, id:string, mem_id:string):Observable<ApiResponse<StatisicsMembersDetials>> {
  //   return this.http.get<ApiResponse<StatisicsMembersDetials>>(`${env.ApiUrl}/localstock/statistics-detials?type=fodder&id=751`)
  // }

  // StatisicsSubSections(type:string, search:string):Observable<ApiResponse<StatisicsSubSections>> {
  //   return this.http.get<ApiResponse<StatisicsSubSections>>(`${env.ApiUrl}/localstock/local-stock-sections?type=poultry&search=`)
  // }

  // StatisicsStocksDetials(type:string, search:string):Observable<ApiResponse<StatisicsStocksDetials>> {
  //   return this.http.get<ApiResponse<StatisicsStocksDetials>>(`${env.ApiUrl}/localstock/statistics-detials-local-stock?id=2`)
  // }
  
}
