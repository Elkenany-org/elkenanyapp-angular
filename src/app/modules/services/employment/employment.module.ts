import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmploymentRoutingModule } from './employment-routing.module';
import { EmploymentHomeComponent } from './employment-home/employment-home.component';
import { AddJobComponent } from './add-job/add-job.component';
import { ApplyJobComponent } from './apply-job/apply-job.component';
import { SharedModule } from '@app/@shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { JobDetailsComponent } from './job-details/job-details.component';
import { YourJobsComponent } from './your-jobs/your-jobs.component';
import { EmploymentComponent } from './employment.component';
import { JobApplicantsComponent } from './job-applicants/job-applicants.component';
import { ApplicationDetailsComponent } from './application-details/application-details.component';


@NgModule({
  declarations: [
    EmploymentHomeComponent,
    AddJobComponent,
    ApplyJobComponent,
    JobDetailsComponent,
    YourJobsComponent,
    EmploymentComponent,
    JobApplicantsComponent,
    ApplicationDetailsComponent
  ],
  imports: [
    CommonModule,
    EmploymentRoutingModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class EmploymentModule { }
