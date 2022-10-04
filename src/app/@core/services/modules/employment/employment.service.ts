import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse } from "@app/@core/@data/API/api";
import { Jobs } from "@app/@core/interfaces/employment/home";
import { Job } from "@app/@core/interfaces/employment/Job";
import { JobDetails } from "@app/@core/interfaces/employment/job-details";
import { MyJobs } from "@app/@core/interfaces/employment/my-jobs";
import { FilterList } from "@app/@core/interfaces/_app/app-response";
import { Observable } from "rxjs";
import {environment as env} from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class EmploymentService {

    constructor(private http: HttpClient) { }

    market(type:string, sort:string,search:string,date:string ):Observable<ApiResponse<Jobs>> {

      return this.http.get<ApiResponse<Jobs>>(`${env.ApiUrl}/store/ads-store?type=${type}&sort=${sort}&search=${search}&date=${date}`)
    }
  
    Filter_list(type:string ):Observable<ApiResponse<FilterList>> {
      return this.http.get<ApiResponse<FilterList>>(`${env.ApiUrl}/store/ads-store-sections?type=${type}`)
    }
  
    // ----------------------------------------- < AD endPoints > -----------------------------------------------//
  
    ad_details(id:number ):Observable<ApiResponse<JobDetails>> {
      return this.http.get<ApiResponse<JobDetails>>(`${env.ApiUrl}/store/ads-store-detials?id=${id}`)
    }
  
  
    get_ad(id:string ):Observable<ApiResponse<Job>> {
      return this.http.get<ApiResponse<Job>>(`${env.ApiUrl}/store/get-ads-store-to-edit?id=${id}`)
    } 
    add_ad( formData: FormData ):Observable<ApiResponse<Job>> {
      return this.http.post<ApiResponse<Job>>(`${env.ApiUrl}/store/add-ads-store`, formData)
    }
  
    edit_ad(formData: FormData ):Observable<ApiResponse<Job>> {
      return this.http.post<ApiResponse<Job>>(`${env.ApiUrl}/store/update-ads-store`, formData)
    }
  
    delete_ad(id: number ):Observable<ApiResponse<Job>> {
      return this.http.get<ApiResponse<Job>>(`${env.ApiUrl}/store/delete-ads-store?id=${id}`)
    }
  
    my_ads(type:string ):Observable<ApiResponse<MyJobs>> {
      return this.http.get<ApiResponse<MyJobs>>(`${env.ApiUrl}/store/my-ads-store?type=${type}`)
    }

  
  
  }  