import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/@core/@data/API/api';
import {environment as env} from '../../../../../environments/environment';
import { map, Observable, of } from 'rxjs';

import { CompaniesFilterList } from '@app/@core/interfaces/companies-guid/co-filter-list-hom,e';
import { Companies, FilterListCompanies } from '@app/@core/interfaces/companies-guid/co-companies';
import { company } from '@app/@core/interfaces/companies-guid/co-company';
import { Rate } from '@app/@core/interfaces/companies-guid/rate';
import { CompaniesHome } from '@app/@core/interfaces/companies-guid/co-home-data';
import { optionBody } from '@app/@core/interfaces/_app/horizontal-search';


    // return this.http.get<ApiResponse<CompaniesHome>>(`${env.ApiUrl}/guide/section/?type=poultry`)  }  origin error

@Injectable({
  providedIn: 'root'
})
export class CompaniesGuideService {

  constructor(private http: HttpClient) { }

// ----------------------------------------- < Companies Home > -----------------------------------------------//

  CompaniesHome(type: string, sort?: string, search?:string):Observable<ApiResponse<CompaniesHome>> {
    return this.http.get<ApiResponse<CompaniesHome>>(`${env.ApiUrl}/guide/section?type=${type}&sort=${sort}&search=${search}`).pipe(
      map( (res:ApiResponse<CompaniesHome>) => {
       const data = { 
        banners: res.data?.banners,
        logos: res.data?.logos,
        sectors: res.data?.sectors,
        sub_sections: res.data?.sub_sections,

        } as ApiResponse<CompaniesHome>
        return data
      }))
  
  }  
  
  Filter_list(type:string): Observable<ApiResponse<CompaniesFilterList>> { //Home
    return this.http.get<ApiResponse<CompaniesFilterList>>(`${env.ApiUrl}/guide/all-filter-guide-sub-sections?type=${type}`);
  }


// ----------------------------------------- < Companies  > -----------------------------------------------//

  Companies(section_id?: string, sub_id?: string, country_id?:string, city_id?:string, sort?:string, search?:string, page?:string):Observable<ApiResponse<Companies>> {
    return this.http.get<ApiResponse<Companies>>(`${env.ApiUrl}/guide/sub-section?section_id=2&sub_id=2`)
    // (`${env.ApiUrl}/guide/sub-section?section_id=${section_id}&sub_id=${sub_id}&country_id=${country_id}&city_id=${city_id}&sort=${sort}&search=${search}&page=${page}`)


  }
  Companiesv2(params:optionBody):Observable<ApiResponse<Companies>> {
    return this.http.get<ApiResponse<Companies>>(`${env.ApiUrl}/guide/sub-section?section_id=${params.section_id}&sub_id=${params.sub_id}&country_id=${params.country_id}&city_id=${params.city_id}&sort=${params.sort}&search=${params.search}&page=${params.page}`)


  }
  co_Filter_list(sector_id:string): Observable<ApiResponse<FilterListCompanies>> { //Home
    return this.http.get<ApiResponse<FilterListCompanies>>(`${env.ApiUrl}/guide/filter-guide-companies?sector_id=${sector_id}&country_id=1`);
  }

  co_Filter_listV2(sector_id?: string ,country_id?:string): Observable<ApiResponse<FilterListCompanies>> { //Home
    return this.http.get<ApiResponse<FilterListCompanies>>(`${env.ApiUrl}/guide/filter-guide-companies?sector_id=${sector_id}&country_id=${country_id}`);
  }
  // ----------------------------------------- < Company > -----------------------------------------------//
  comapny(id:string): Observable<ApiResponse<company>> { //Home
    
    return this.http.get<ApiResponse<company>>(`${env.ApiUrl}/guide/company?id=${id}`)
  }

  // ----------------------------------------- < Rate > -----------------------------------------------//
  rate(body: {company_id:string, reat:string}): Observable<ApiResponse<Rate>> { 
    return this.http.post<ApiResponse<Rate>>(`${env.ApiUrl}/guide/rating-company`,body)
  }
  
}


