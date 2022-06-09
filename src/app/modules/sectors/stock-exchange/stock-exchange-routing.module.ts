import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LocalStockLocalAndFodder } from '@app/@core/resolver/stock-exchange/local-stock-fodder';
import { StockExhangeResolver } from '@app/@core/resolver/stock-exhange-resolver.service';
import { LayoutComponent } from '@app/@shared/components/layout/layout.component';
import {NotFoundComponent} from '@app/@shared/pages/not-found/not-found.component';
import { ComparisonComponent } from './comparison/comparison.component';
import { HomeStockExchangeComponent } from './home-stock-exchange/home-stock-exchange.component';
import { StockExchangeComponent } from './stock-exchange/stock-exchange.component';

const children: Routes = [
  {
    path: '',
    component: HomeStockExchangeComponent,
    resolve: {
      resolve: StockExhangeResolver
    },
  },
  {
    path: 'stock-exchange/:type/:type_stock/:id',
    component: StockExchangeComponent,
    resolve: {
      resolve: LocalStockLocalAndFodder
    }
  },

  {
    path: 'comparison/:id',
    component: ComparisonComponent
  },
  {
    path:"statistics",
    loadChildren: () => 
    import('./statistics-module/statistics.module').then((m) => m.StockExchangeModule)
  },
  {
    path:"comarsion",
    component:ComparisonComponent

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
export class StockExchangeRoutingModule {
}

