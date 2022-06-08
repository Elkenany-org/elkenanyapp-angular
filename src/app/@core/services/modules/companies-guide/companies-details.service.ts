import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/@core/@data/API/api';
import { StockExchange } from '@app/@core/interfaces/stock-exchanges/Stock-exchange';
import { Observable } from 'rxjs';
import {environment as env} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompaniesDetailsService { ///All For Test

  constructor(private http: HttpClient) {
  }

  GetGuide(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${env.ApiUrl}guide/company/?id=2103`);
  }
  GetGuidea(): Observable<ApiResponse<StockExchange>> {
    return this.http.get<ApiResponse<StockExchange>>(`${env.ApiUrl}/localstock/local-stock-sections?type=poultry&search=`);
  }


}
