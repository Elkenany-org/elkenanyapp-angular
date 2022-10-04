import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmploymentRoutingModule } from './employment-routing.module';
import { EmploymentHomeComponent } from './employment-home/employment-home.component';
import { AddJobComponent } from './add-job/add-job.component';
import { ApplyJobComponent } from './apply-job/apply-job.component';
import { SharedModule } from '@app/@shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    EmploymentHomeComponent,
    AddJobComponent,
    ApplyJobComponent
  ],
  imports: [
    CommonModule,
    EmploymentRoutingModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class EmploymentModule { }
