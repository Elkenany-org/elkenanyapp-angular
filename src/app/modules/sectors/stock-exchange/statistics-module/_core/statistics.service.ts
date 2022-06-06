import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/@core/@data/API/api';
import { StatisticsMember, StatisticsSubsSections,StatisicsStocksDetials, StatisticsMembersLocal } from '@core/interfaces/stock-exchanges/statistics';
import { Observable } from 'rxjs';
// import { StatisicsMembers, StatisicsMembersDetials, StatisicsStocksDetials, StatisicsSubSections, StatisticsMember } from './statistics';
// import { StatisticsMember, StatisticsSubsSections } from './statistics';
import {environment as env} from '../../../../../../environments/environment';
import { FilterList } from './../../../../../@core/interfaces/_app/filter-list';
import { StatisticsMembersDetials } from './../../../../../@core/interfaces/stock-exchanges/statistics';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http:HttpClient) { }


   // ----------------------------------------- < statistics > -----------------------------------------------//

   StatisicsMembersLocal(id:string,type:string, from:string, to:string, mem_id:string):Observable<ApiResponse<StatisticsMembersLocal>> {
    return this.http.get<ApiResponse<StatisticsMembersLocal>>(`${env.ApiUrl}/localstock/statistics-Localstock-members?from=2021-06-1&to=2021-06-30&id=${id}&mem_id=`)//579
  }

  StatisicsMembersDetials(type:string, from:string, to:string, id:string):Observable<ApiResponse<StatisticsMembersDetials>> {
    return this.http.get<ApiResponse<StatisticsMembersDetials>>(`${env.ApiUrl}/localstock/statistics-detials?type=${type}&from=${from}&to=${to}&id=${id}`)
  }

  StatisicsSubSections(type:string, from:string, to:string, id:string):Observable<ApiResponse<StatisticsSubsSections>> {
    return this.http.get<ApiResponse<StatisticsSubsSections>>(`${env.ApiUrl}/localstock/statistics-stock-sections?type=${type}&from=${from}&to=${to}&id=${id}`)
  }


  StatisicsStocksDetials(id:string, from?:string, to?:string):Observable<ApiResponse<StatisicsStocksDetials>> {
    return this.http.get<ApiResponse<StatisicsStocksDetials>>(`${env.ApiUrl}/localstock/statistics-detials-local-stock?from=${from}&to=${to}&id=${id}`)
  }
  
}
