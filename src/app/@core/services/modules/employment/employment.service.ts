import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse } from "@app/@core/@data/API/api";
import { searchCompanies } from "@app/@core/interfaces/employment/add-job";
import { applicants, application, applicationDetails, applicationRes } from "@app/@core/interfaces/employment/applicants";
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

    AllJobs( sort:string,search:string,cate:string , page?:string):Observable<ApiResponse<Jobs>> {

      return this.http.get<ApiResponse<Jobs>>(`${env.ApiUrl}/recruitment/jobs-store?sort=${sort}&search=${search}&cate=${cate}&page=${page}`)
    }
  
    Filter_list():Observable<ApiResponse<FilterList>> {
      return this.http.get<ApiResponse<FilterList>>(`${env.ApiUrl}/recruitment/jobs-store-categories`)
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
  
    update_job( formData: FormData ):Observable<ApiResponse<Job>> {
      return this.http.post<ApiResponse<Job>>(`${env.ApiUrl}/recruitment/update-job`, formData)
    }

    delete_job( id: number ):Observable<ApiResponse<Job>> {
      return this.http.post<ApiResponse<Job>>(`${env.ApiUrl}/recruitment/delete-job?id=${id}`, {})
    }

    my_jobs(page:string ):Observable<ApiResponse<MyJobs>> {
      return this.http.get<ApiResponse<MyJobs>>(`${env.ApiUrl}/recruitment/my-jobs-store?page=${page}`)
    }

    applicants(job_id:string,select:string,search:string):Observable<ApiResponse<applicants>>{
      return this.http.get<ApiResponse<applicants>>(`${env.ApiUrl}/recruitment/job-applicants?job_id=${job_id}&select=${select}&search=${search}`)
    }

    apply_job(formData: FormData ):Observable<ApiResponse<applicationRes>> {
      return this.http.post<ApiResponse<applicationRes>>(`${env.ApiUrl}/recruitment/apply-job`, formData)
    }
  
    Filter_applicants():Observable<ApiResponse<FilterList>> {
      return this.http.get<ApiResponse<FilterList>>(`${env.ApiUrl}/recruitment/filter-applicants`)
    }
  
    application_details(id:string):Observable<ApiResponse<applicationDetails>>{
      return this.http.get<ApiResponse<applicationDetails>>(`${env.ApiUrl}/recruitment/application-details?app_id=${id}`)
    }

    qualified_application(formData: FormData):Observable<ApiResponse<any>>{
      return this.http.post<ApiResponse<any>>(`${env.ApiUrl}/recruitment/add-to-qualified-applicants`,formData)
    }
  }  