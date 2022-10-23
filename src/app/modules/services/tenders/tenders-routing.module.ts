import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TendersResolver } from '@app/@core/resolver/tenders/tenders.resolver.service';
import { LayoutComponent } from '@app/@shared/components/layout/layout.component';
import { NotFoundComponent } from '@app/@shared/pages/not-found/not-found.component';
import { TendersDetailsComponent } from './tenders-details/tenders-details.component';
import { TendersHomeComponent } from './tenders-home/tenders-home.component';
import { TendersComponent } from './tenders/tenders.component';

const routes: Routes = [
  {
    path: '',
    component: TendersHomeComponent
  },
  {
    path: ':id',
    resolve: {
      resolve: TendersResolver
    },
    component: TendersComponent,
  },
  {
    path: 'details/:id',
    component: TendersDetailsComponent
  },

  {
    path: '**',
    component: NotFoundComponent,
  }
];

// const routes: Routes = [
//   {
//     path: '',
//     component: LayoutComponent,
//     children
//   },
// ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TendersRoutingModule { }
