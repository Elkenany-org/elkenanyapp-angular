import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/@core/@data/API/api';
import { AllNews, NewsDetials, TendersDetials } from '@app/@core/interfaces/news/news';
import { FilterList } from '@app/@core/interfaces/_app/app-response';
import { Observable } from 'rxjs';
import {environment as env} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TendersService {

  constructor(private http: HttpClient) {
  }  

  all_news(type:string, sort?:string, search?:string,page?:number): Observable<ApiResponse<AllNews>> { 
    return this.http.get<ApiResponse<AllNews>>(`${env.ApiUrl}/tenders/tenders?type=${type}&sort=${sort}&search=${search}&page=${page}`);
  }

  news_details(id:number): Observable<ApiResponse<TendersDetials>> { 
    return this.http.get<ApiResponse<TendersDetials>>(`${env.ApiUrl}/tenders/tenders-detials?id=${id}`);
  }

  filter_list(type:string): Observable<ApiResponse<FilterList>> { 
    return this.http.get<ApiResponse<FilterList>>(`${env.ApiUrl}/tenders/filter-sections-tenders?type=${type}`);
  }
}
