import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/@core/@data/API/api';
import { Gallery, GallriesData, Rate } from '@app/@core/interfaces/gallery/gallery';
import { FilterList } from '@app/@core/interfaces/_app/app-response';
import { Observable } from 'rxjs';
import { environment as env } from "../../../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class GallaryService {

  constructor(private http:HttpClient) { }
//----------------------------------------gallery home page ----------------------------------------------//

  galleries(Data:{[key:string]:string}):Observable<ApiResponse<GallriesData>> {
    return this.http.get<ApiResponse<GallriesData>>(`${env.ApiUrl}/showes/all-showes?type=${Data['sector']}&city_id=${Data['cities']}&sort=${Data['sort']}&search=${Data['search']}&country_id=${Data['countries']}&page=${Data['page']}`)
  }

  filter_list(type:string, country_id:string):Observable<ApiResponse<FilterList>> {
    return this.http.get<ApiResponse<FilterList>>(`${env.ApiUrl}/showes/filter-showes?type=${type}&country_id=${country_id}`)
  }

//----------------------------------------gallery page ----------------------------------------------//
  gallery(id:number):Observable<ApiResponse<Gallery>> {
    return this.http.get<ApiResponse<Gallery>>(`${env.ApiUrl}/showes/one-show?id=${id}`)

  }

  add_place(data:FormData):Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${env.ApiUrl}/showes/one-show-place`,data)
  }
//----------------------------------------gallery page ----------------------------------------------//
  reviews(id:number):Observable<ApiResponse<Rate>> {
    return this.http.get<ApiResponse<Rate>>(`${env.ApiUrl}/showes/one-show-review?id=${id}`)

  }
//----------------------------------------gallery page ----------------------------------------------//
  speakers(id:number):Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${env.ApiUrl}/showes/one-show-speakers?id=${id}`)

  }
 //----------------------------------------gallery page ----------------------------------------------//
 showers(id:number):Observable<ApiResponse<any>> {
  return this.http.get<ApiResponse<any>>(`${env.ApiUrl}/showes/one-show-showers?id=${id}`)

} 
 //----------------------------------------reate page ----------------------------------------------//
 add_rate(data:FormData):Observable<ApiResponse<any>> {
  return this.http.post<ApiResponse<any>>(`${env.ApiUrl}/showes/one-show-reat`,data)

} 
 //----------------------------------------add going ----------------------------------------------//

add_going(data:{[show_id:string]:number}):Observable<ApiResponse<any>> {
  return this.http.post<ApiResponse<any>>(`${env.ApiUrl}/showes/one-show-going`,data)
}

 //----------------------------------------not going ----------------------------------------------//

 not_going(data:{[show_id:string]:number}):Observable<ApiResponse<any>> {
  return this.http.post<ApiResponse<any>>(`${env.ApiUrl}/showes/one-show-notgoing`,data)
}
}
