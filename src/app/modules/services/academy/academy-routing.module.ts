import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcademyHomeComponent } from './academy-home/academy-home.component';
import { AcademyResolver } from '@app/@core/resolver/academy/academy.resolver';

const routes:Routes = [
  {
    path: '',
    component: AcademyHomeComponent,
    resolve: {
      resolve: AcademyResolver
    }
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademyRoutingModule { }
