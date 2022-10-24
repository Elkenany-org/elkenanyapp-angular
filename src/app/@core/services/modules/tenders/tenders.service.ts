import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/@core/@data/API/api';
import { AllNews, allSections, NewsDetials, TendersDetials } from '@app/@core/interfaces/news/news';
import { FilterList, TendersFilterList } from '@app/@core/interfaces/_app/app-response';
import { Observable } from 'rxjs';
import {environment as env} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TendersService {

  constructor(private http: HttpClient) {
  }  

  all_news(section_id:string, sort?:string, search?:string,page?:number): Observable<ApiResponse<AllNews>> { 
    return this.http.get<ApiResponse<AllNews>>(`${env.ApiUrl}/tenders/tenders?section_id=${section_id}&sort=${sort}&search=${search}&page=${page}`);
  }

  news_details(id:number): Observable<ApiResponse<TendersDetials>> { 
    return this.http.get<ApiResponse<TendersDetials>>(`${env.ApiUrl}/tenders/tenders-detials?id=${id}`);
  }

  filter_list(section_id:string): Observable<ApiResponse<TendersFilterList>> { 
    return this.http.get<ApiResponse<TendersFilterList>>(`${env.ApiUrl}/tenders/filter-sections-tenders?section_id=${section_id}`);
  }

  all_sections(sort:string,search:string): Observable<ApiResponse<allSections>> { 
    return this.http.get<ApiResponse<allSections>>(`${env.ApiUrl}/tenders/tenders-sections?sort=${sort}&search=${search}`);
  }
  filter_home(): Observable<ApiResponse<FilterList>> { 
    return this.http.get<ApiResponse<FilterList>>(`${env.ApiUrl}/tenders/filter-home`);
  }
}
