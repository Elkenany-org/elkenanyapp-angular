import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse } from "@app/@core/@data/API/api";
import { searchCompanies } from "@app/@core/interfaces/employment/add-job";
import { applicants, application, applicationRes } from "@app/@core/interfaces/employment/applicants";
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
  
    my_jobs(type:number,page:string ):Observable<ApiResponse<MyJobs>> {
      return this.http.get<ApiResponse<MyJobs>>(`${env.ApiUrl}/recruitment/my-jobs-store?sector=${type}&page=${page}`)
    }

    applicants(job_id:string):Observable<ApiResponse<applicants>>{
      return this.http.get<ApiResponse<applicants>>(`${env.ApiUrl}/recruitment/job-applicants?job_id=${job_id}`)
    }

    apply_job(formData: FormData ):Observable<ApiResponse<applicationRes>> {
      return this.http.post<ApiResponse<applicationRes>>(`${env.ApiUrl}/recruitment/apply-job`, formData)
    }
  
  
  }  