import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LayoutComponent } from '@app/@shared/components/layout/layout.component';
import {NotFoundComponent} from '@app/@shared/pages/not-found/not-found.component';
import { MagazineDetailsComponent } from './magazine-details/magazine-details.component';
import { MagazineComponent } from './magazine/magazine.component';


const children: Routes = [
  {
    path: '',
    component: MagazineComponent
  },
  {
    path: 'details/:id',
    component: MagazineDetailsComponent,
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
export class MagazineRoutingModule {
}
