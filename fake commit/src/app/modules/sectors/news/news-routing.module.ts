import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { StockExhangeResolver } from '@app/@core/resolver/stock-exhange-resolver.service';
import { LayoutComponent } from '@app/@shared/components/layout/layout.component';
import {NotFoundComponent} from '@app/@shared/pages/not-found/not-found.component';
import { ComparisonComponent } from '../stock-exchange/comparison/comparison.component';
import { HomeStockExchangeComponent } from '../stock-exchange/home-stock-exchange/home-stock-exchange.component';
import { StockExchangeComponent } from '../stock-exchange/stock-exchange/stock-exchange.component';
import { LocalStockFodder } from '../stock-exchange/_core/resolver/local-stock-fodder';
import { NewsContentComponent } from './news-content/news-content.component';
import { NewsHomeComponent } from './news-home/news-home.component';


const children: Routes = [
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
export class NewsRoutingModule {
}

