import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuardService } from '@app/@core/guards/auth.guard';
import { StatisticsMembersResolver } from '@app/@core/resolver/stock-statistics/statistics-members-resolver.service';
import { StatisticsResolver } from '@app/@core/resolver/stock-statistics/statistics-resolver.service';
import { LayoutComponent } from '@app/@shared/components/layout/layout.component';
import {NotFoundComponent} from '@app/@shared/pages/not-found/not-found.component';

import { StatisticsDetialsComponent } from './statistics-detials/statistics-detials.component';
import { StatisticsMembersComponent } from './statistics-members/statistics-members.component';
import { StatisticsComponent } from './statistics/statistics.component';


const routes: Routes = [
  {
    path: '',
    component: StatisticsComponent ,
    resolve: {
      resolve: StatisticsResolver
    }
  },
    {
    path: ':type/:id',
    component: StatisticsMembersComponent,
    // canActivate:[AuthGuardService],
    resolve: {
      resolve: StatisticsMembersResolver
    },

  },

  {
    path: 'تفاصيل/:type/:id',
    component: StatisticsDetialsComponent,
    canActivate:[AuthGuardService]
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
export class StatisticsRoutingModule {
}

