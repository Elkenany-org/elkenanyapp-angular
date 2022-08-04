import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuardService } from '@app/@core/guards/auth.guard';
import { CompaniesDetailsResolver } from '@app/@core/resolver/companies-guide/companies-details-guide-resolver.service';
import { CompaniesGuideHomeResolver } from '@app/@core/resolver/companies-guide/companies-guide-home-resolver.service';
import { CompaniesGuideResolver } from '@app/@core/resolver/companies-guide/companies-guide-resolver.service';
import { LayoutComponent } from '@app/@shared/components/layout/layout.component';
import {NotFoundComponent} from '@app/@shared/pages/not-found/not-found.component';
import { CoGuideHomeComponent } from './co-guide-home/co-guide-home.component';
import { CoGuideComponent } from './co-guide/co-guide.component';
import { CompaniesDetailsComponent } from './companies-details/companies-details.component';

const children: Routes = [
  {
    path: '',
    component: CoGuideHomeComponent,
    resolve: {
      resolve: CompaniesGuideHomeResolver
    },
  },
  {
    path: 'companies/:type/:id',
    component: CoGuideComponent,
    resolve: {
      resolve: CompaniesGuideResolver
    },
  },
  {
    path: 'companies_details/:type/:id',
    component: CompaniesDetailsComponent,
    resolve: {
      resolve: CompaniesDetailsResolver
    },
    // canActivate: [AuthGuardService]
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesGuideRoutingModule {
}
