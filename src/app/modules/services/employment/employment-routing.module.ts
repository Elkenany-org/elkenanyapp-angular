import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmploymentHomeResolver } from '@app/@core/resolver/employment/employment-home.resolver';
import { NotFoundComponent } from '@app/@shared/pages/not-found/not-found.component';
import { AddJobComponent } from './add-job/add-job.component';
import { ApplyJobComponent } from './apply-job/apply-job.component';
import { EmploymentHomeComponent } from './employment-home/employment-home.component';

const routes: Routes = [
  {
    path: '',
    component: EmploymentHomeComponent,
    resolve: {
      resolve: EmploymentHomeResolver
    },
  },

  {
    path: 'apply:id',
    component: ApplyJobComponent
  },
  {
    path: 'add-job',
    component: AddJobComponent
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
