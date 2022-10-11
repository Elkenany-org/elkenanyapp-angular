import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse } from "@app/@core/@data/API/api";
import { searchCompanies } from "@app/@core/interfaces/employment/add-job";
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

    AllJobs(sector:string, sort:string,search:string,cate:string , page?:string):Observable<ApiResponse<Jobs>> {

      return this.http.get<ApiResponse<Jobs>>(`${env.ApiUrl}/recruitment/jobs-store?sector=${sector}&sort=${sort}&search=${search}&cate=${cate}&page=${page}`)
    }
  
    Filter_list(sector_id:string ):Observable<ApiResponse<FilterList>> {
      return this.http.get<ApiResponse<FilterList>>(`${env.ApiUrl}/recruitment/jobs-store-categories?sector_id=${sector_id}`)
    }
  
    // ----------------------------------------- < AD endPoints > -----------------------------------------------//
  
    job_details(id:string ):Observable<ApiResponse<JobDetails>> {
      return this.http.get<ApiResponse<JobDetails>>(`${env.ApiUrl}/recruitment/job-detials?id=${id}`)
    }
  
    searchCompany(search:string){
      return this.http.get<ApiResponse<searchCompanies>>(`${env.ApiUrl}/search-companies?search=${search}`)
    }

    add_job( formData: FormData ):Observable<ApiResponse<Job>> {
      return this.http.post<ApiResponse<Job>>(`${env.ApiUrl}/recruitment/add-job`, formData)
    }
  
    get_ad(id:string ):Observable<ApiResponse<Job>> {
      return this.http.get<ApiResponse<Job>>(`${env.ApiUrl}/store/get-ads-store-to-edit?id=${id}`)
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