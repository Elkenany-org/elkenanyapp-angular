import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/@core/@data/API/api';
import { AllNews, NewsDetials } from '@app/@core/interfaces/news/news';
import { FilterList } from '@app/@core/interfaces/_app/filter-list';
import { Observable } from 'rxjs';
import {environment as env} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) {
  }  

  all_news(section_id:string, sort?:number, search?:string,page?:number): Observable<ApiResponse<AllNews>> { //Home
    // console.log(type)
    return this.http.get<ApiResponse<AllNews>>(`${env.ApiUrl}/news/news?section_id=${section_id}&sort=${sort}&search=${search}&page=${page}`);
    // return this.http.get<ApiResponse<AllNews>>(`${env.ApiUrl}/news/news?type=poultry&sort=2&search=`);
  }

  news_details(id:number): Observable<ApiResponse<NewsDetials>> { //Home
    return this.http.get<ApiResponse<NewsDetials>>(`${env.ApiUrl}/news/news-detials?id=${id}`);
  }

  filter_list(section_id:string): Observable<ApiResponse<FilterList>> { //Home
    return this.http.get<ApiResponse<FilterList>>(`${env.ApiUrl}/news/filter-sections-news?section_id=${section_id}`);
  }

}
