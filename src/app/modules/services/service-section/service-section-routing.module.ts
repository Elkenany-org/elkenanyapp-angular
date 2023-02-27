import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesGuideResolver } from '@app/@core/resolver/companies-guide/companies-guide-resolver.service';
import { path } from 'd3';
import { ServiceSectionComponent } from './service-section.component';

const routes: Routes = [
  {
    path:':type',
    component: ServiceSectionComponent,
    resolve: {
      resolve: CompaniesGuideResolver
    },
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceSectionRoutingModule { 


}
