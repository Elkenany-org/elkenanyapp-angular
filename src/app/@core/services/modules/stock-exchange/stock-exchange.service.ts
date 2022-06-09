import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/@core/@data/API/api';
import { map, Observable } from 'rxjs';
import {environment as env} from '../../../../../environments/environment';
import { CompaniesItems, FeedsItems, Fodder,StockExchange, ComprisonFodderGetData ,LocalStockFodder, FilterListSub} from '@app/@core/interfaces/stock-exchanges/Stock-exchange';
import { Comparison, Compare, CompareBody } from '@app/@core/interfaces/stock-exchanges/conversion';
import { FilterList } from '@app/@core/interfaces/_app/filter-list';
import { FilterListSubItems } from '@app/@core/interfaces/stock-exchanges/statistics';


@Injectable({
  providedIn: 'root'
})
export class StockExchangeService {

 
  constructor(private http: HttpClient) {
  }


  // ----------------------------------------- < Home Stock Exchanges > ----------------------------------------------- //

  GetStockExchange(type:string): Observable<ApiResponse<StockExchange>> { //Home
    return this.http.get<ApiResponse<StockExchange>>(`${env.ApiUrl}/localstock/local-stock-sections?type=${type}&search=`);
  }


  GetStockExchangeV2(type:string, sort?:string, search?:string):Observable<ApiResponse<StockExchange>> { //Home
   return this.http.get<ApiResponse<StockExchange>>(`${env.ApiUrl}/localstock/local-stock-sections?type=${type}&search=${search}&sort=${sort}`, 
   ).pipe(
     map( (res:ApiResponse<StockExchange>) => {
      const data = { 
        banners: res.data?.banners,
        logos: res.data?.logos,
        sectors: res.data?.sectors,
        sub_sections: res.data?.fod_sections?.concat(res.data.sub_sections),
       } as ApiResponse<StockExchange>
       return data
     }))
 }

  Filter_list(type:string): Observable<ApiResponse<FilterList>> { //Home
    return this.http.get<ApiResponse<FilterList>>(`${env.ApiUrl}/localstock/all-local-stock-sections?type=${type}`);
  }


  // ----------------------------------------- < Local Stock and Fodder Sub > -----------------------------------------------//


  LocalStockandFodderSub(id:number, type:string, date:string) : Observable<ApiResponse<LocalStockFodder>> {
    return this.http.get<ApiResponse<LocalStockFodder>>(`${env.ApiUrl}/localstock/new-local-stock-show-sub-section?id=${id}&type=${type}&date=${date}`)
  }
  newLocalStockandFodderSub(id:number, type:string, data:string) : Observable<ApiResponse<LocalStockFodder>> {
    return this.http.get<ApiResponse<LocalStockFodder>>(`${env.ApiUrl}/localstock/new-local-stock-show-sub-section?id=${id}&type=${type}&date=${data}`)
  }

  FilterListItemSub(type:string, type_stock:string,  id:string):Observable<ApiResponse<FilterListSubItems>> {
    return this.http.get<ApiResponse<FilterListSubItems>>(`${env.ApiUrl}/localstock/filter-stock-show-sub-section?id=${id}id&type=${type}&type_stock=${type_stock}`)
  }


  feeds_items(stock_id:number |string, mini_id?:number) : Observable<ApiResponse<FeedsItems>> {
    return this.http.get<ApiResponse<FeedsItems>>(`${env.ApiUrl}/localstock/feeds-items?stock_id=${stock_id}&mini_id=${mini_id}`)
  }
  companies_items(stock_id:number, company_id?:number) : Observable<ApiResponse<CompaniesItems[]>> {
    return this.http.get<ApiResponse<CompaniesItems[]>>(`${env.ApiUrl}/localstock/companies-items?stock_id=${stock_id}&company_id=${company_id}`)
  
  }




  fodder(id:string, data:string,fod_id?:string,comp_id?:string) : Observable<ApiResponse<LocalStockFodder>> {
    return this.http.get<ApiResponse<LocalStockFodder>>(`${env.ApiUrl}/v2/fodder/tables?id=${id}&date=${data}&fod_id=${fod_id}&comp_id=${comp_id}`)
  }

  local(id:string, data:string) : Observable<ApiResponse<Fodder>> {
    return this.http.get<ApiResponse<Fodder>>(`${env.ApiUrl}/v2/local/tables?id=${id}&date=${data}`)
  }

  Filter_list_sub(id: number, type:string, type_stock:string): Observable<ApiResponse<FilterListSub>> { //Home
    return this.http.get<ApiResponse<FilterListSub>>(`${env.ApiUrl}/localstock/filter-stock-show-sub-section?id=1&type=poultry&type_stock=fodder`);
    // return this.http.get<ApiResponse<FilterList>>(`${env.ApiUrl}/localstock/filter-stock-show-sub-section?id=${id}&type=${type}&type_stock=${type_stock}`);
  }

  // ----------------------------------------- < ComprisonFodder > -----------------------------------------------//

  ComprisonFodderGetData(body:any) : Observable<ApiResponse<ComprisonFodderGetData>> {
    return this.http.post<ApiResponse<ComprisonFodderGetData>>(`${env.ApiUrl}/localstock/comprison-fodder?id=1`,body)
  }

  ComprisonFodder(id:string):Observable<ApiResponse<Comparison>> {
    return this.http.get<ApiResponse<Comparison>>(`${env.ApiUrl}/localstock/comprison-fodder?id=${id}`)
  }
  
  compare(body:CompareBody):Observable<ApiResponse<Compare>> {
    return this.http.post<ApiResponse<Compare>>(`${env.ApiUrl}/localstock/comprison-fodder-get`,body)
  }

 }
