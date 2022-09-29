import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LayoutComponent } from '@app/@shared/components/layout/layout.component';
import {NotFoundComponent} from '@app/@shared/pages/not-found/not-found.component';

import { NewsContentComponent } from './news-content/news-content.component';
import { NewsHomeComponent } from './news-home/news-home.component';


const routes: Routes = [
  {
    path: '',
    component: NewsHomeComponent
  },

  {
    path: ':id',
    component: NewsContentComponent
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
export class NewsRoutingModule {
}

