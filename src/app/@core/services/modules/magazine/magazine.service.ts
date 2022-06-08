import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/@core/@data/API/api';
import { Magazine, Magazines } from '@app/@core/interfaces/magazine/magazine';
import { Observable } from 'rxjs';
import { environment as env } from "../../../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class MagazineService {

  constructor(private http: HttpClient) { }


  magazines(type: string, sort: number, city_id: string, search: string):Observable<ApiResponse<Magazines>>{
    return this.http.get<ApiResponse<Magazines>>(`${env.ApiUrl}/magazine/magazines?type=${type}&sort=${sort}&city_id=${city_id}&search=${search}`)
  }

  magazine(id: number):Observable<ApiResponse<Magazine>>{
    return this.http.get<ApiResponse<Magazine>>(`${env.ApiUrl}/magazine/magazine-detials?id=${id}`)
  }


  filter_list(type: string, city_id: number):Observable<ApiResponse<any>>{
    return this.http.get<ApiResponse<any>>(`${env.ApiUrl}/magazine/filter-sections-magazines?type=${type}&country_id=${city_id}`)
  }


}
