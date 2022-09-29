import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { MagazineResolver } from '@app/@core/resolver/magazines/magazine-resolver.service';
import { MagazineDetailsResolver } from '@app/@core/resolver/magazines/magazines-resolver.service';
import { LayoutComponent } from '@app/@shared/components/layout/layout.component';
import {NotFoundComponent} from '@app/@shared/pages/not-found/not-found.component';
import { MagazineDetailsComponent } from './magazine-details/magazine-details.component';
import { MagazineComponent } from './magazine/magazine.component';


const routes: Routes = [
  {
    path: '',
    component: MagazineComponent,
    resolve: {
      resolve:MagazineResolver
    }
  },
  {
    path: 'details/:id',
    component: MagazineDetailsComponent,
    resolve: {
      resolve:MagazineDetailsResolver
    }
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
export class MagazineRoutingModule {
}
