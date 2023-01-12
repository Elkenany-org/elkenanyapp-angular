import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/@core/@data/API/api';
import { Magazine, Magazines } from '@app/@core/interfaces/magazine/magazine';
import { Rate } from '@app/@core/interfaces/magazine/rate';
import { Observable } from 'rxjs';
import { environment as env } from "../../../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class MagazineService {

  constructor(private http: HttpClient) {
  }

  magazines(type: string, sort: string,country_id: string, city_id: string, search: string,page:string):Observable<ApiResponse<Magazines>>{
    return this.http.get<ApiResponse<Magazines>>(`${env.ApiUrl}/magazine/magazines?section_id=${type}&sort=${sort}&country_id=${country_id}&city_id=${city_id}&search=${search}&page=${page}`)
  }

  magazine(id: number):Observable<ApiResponse<Magazine>>{
  //   const headers= new HttpHeaders()
  // .set('Authorization', 'Bearer ')
//  ,{ 'headers': headers }
    return this.http.get<ApiResponse<Magazine>>(`${env.ApiUrl}/magazine/magazine-detials?id=${id}`)
  }


  filter_list(type: string, country_id: number):Observable<ApiResponse<any>>{
    return this.http.get<ApiResponse<any>>(`${env.ApiUrl}/magazine/filter-sections-magazines?section_id=${type}&country_id=${country_id}`)
  }

  // ----------------------------------------- < Rate > -----------------------------------------------//
  rate(body: {maga_id:string, reat:string}): Observable<ApiResponse<Rate>> { 
    return this.http.post<ApiResponse<Rate>>(`${env.ApiUrl}/magazine/rating-magazine`,body)
  }
  
}
