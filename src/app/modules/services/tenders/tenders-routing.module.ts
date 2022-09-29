import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '@app/@shared/components/layout/layout.component';
import { NotFoundComponent } from '@app/@shared/pages/not-found/not-found.component';
import { TendersDetailsComponent } from './tenders-details/tenders-details.component';
import { TendersComponent } from './tenders/tenders.component';

const routes: Routes = [
  {
    path: '',
    component: TendersComponent
  },

  {
    path: ':id',
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
