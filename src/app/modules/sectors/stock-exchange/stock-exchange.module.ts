import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockExchangeRoutingModule } from './stock-exchange-routing.module';
import { SharedModule } from '@app/@shared/shared.module';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HomeStockExchangeComponent } from './home-stock-exchange/home-stock-exchange.component';
import { StockExchangeComponent } from './stock-exchange/stock-exchange.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { ComparisonComponent } from './comparison/comparison.component';


@NgModule({
  declarations: [
    HomeStockExchangeComponent,
    StockExchangeComponent,
    ComparisonComponent
  ],
  imports: [




    StockExchangeRoutingModule,
    SharedModule,
    
    NgxSkeletonLoaderModule.forRoot({ animation: 'pulse', loadingText: 'This item is actually loading...' }),
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),

  ]
})
export class StockExchangeModule { }
