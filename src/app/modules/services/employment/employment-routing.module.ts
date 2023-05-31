import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '@app/@core/guards/auth.guard';
import { EmploymentHomeResolver } from '@app/@core/resolver/employment/employment-home.resolver';
import { JobDetailsResolver } from '@app/@core/resolver/employment/job-details.resolver';
import { NotFoundComponent } from '@app/@shared/pages/not-found/not-found.component';
import { AddJobComponent } from './add-job/add-job.component';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { ApplyJobComponent } from './apply-job/apply-job.component';
import { EmploymentHomeComponent } from './employment-home/employment-home.component';
import { EmploymentComponent } from './employment.component';
import { JobApplicantsComponent } from './job-applicants/job-applicants.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { YourJobsComponent } from './your-jobs/your-jobs.component';

const routes: Routes = [
  {
    path: '',
    component: EmploymentComponent,
    children:[
      {
        path: '',
        component: EmploymentHomeComponent,
            resolve: {
        resolve: EmploymentHomeResolver
                },
      },
      {
        path: 'وظائفك',
        component: YourJobsComponent
      },
    ]

  },

  {
    path: 'تقديم/:id',
    component: ApplyJobComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'إضافة-وظيفة',
    component: AddJobComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'تعديل-وظيفة/:id',
    component: AddJobComponent,
    resolve: {
      resolve: JobDetailsResolver
    },
    canActivate: [AuthGuardService]
  },
  {
    path: 'تفاصيل-الوظيفة/:id',
    component: JobDetailsComponent,
    resolve: {
      resolve: JobDetailsResolver
    },
  },

  {
    path: 'المتقدمين-للوظيفة/:id',
    component: JobApplicantsComponent,
    canActivate: [AuthGuardService]

  },
  {
    path: 'تفاصيل-المتقدم/:id',
    component: ApplicationDetailsComponent,
    canActivate: [AuthGuardService]

  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmploymentRoutingModule { }
