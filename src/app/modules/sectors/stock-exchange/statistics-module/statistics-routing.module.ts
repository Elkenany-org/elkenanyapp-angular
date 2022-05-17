import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LayoutComponent } from '@app/@shared/components/layout/layout.component';
import {NotFoundComponent} from '@app/@shared/pages/not-found/not-found.component';

import { StatisticsDetialsComponent } from './statistics-detials/statistics-detials.component';
import { StatisticsComponent } from './statistics/statistics.component';


const routes: Routes = [
  {
    path: '',
    component: StatisticsComponent
  },

  {
    path: 'statistics-detials/:id',
    component: StatisticsDetialsComponent
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

