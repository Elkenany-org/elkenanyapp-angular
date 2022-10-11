import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { Jobs } from '@app/@core/interfaces/employment/home';
import { JobDetails } from '@app/@core/interfaces/employment/job-details';
import { EmploymentService } from '@app/@core/services/modules/employment/employment.service';
import { catchError, EMPTY, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobDetailsResolver implements Resolve<ApiResponse<JobDetails>> {
  constructor(private Jobs: EmploymentService ,private router: Router) { }

  resolve(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot):Observable<ApiResponse<JobDetails>>  {
    console.log("jobs Resolver is work ")
   return this.Jobs.job_details(route.paramMap.get('id')||'').pipe(
     catchError(() => {
       this.router.navigate([""]);
       return EMPTY
     })
   )
  }
}
