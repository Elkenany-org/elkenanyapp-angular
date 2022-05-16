import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { SharedModule } from '@app/@shared/shared.module';
import { StatisticsComponent } from './statistics/statistics.component';
import { StatisticsDetialsComponent } from './statistics-detials/statistics-detials.component';




@NgModule({
  declarations: [
    StatisticsComponent,
    StatisticsDetialsComponent
  ],
  imports: [
    StatisticsRoutingModule,
    SharedModule,
   
  ]
})
export class StockExchangeModule { }
