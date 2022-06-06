import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { SharedModule } from '@app/@shared/shared.module';
import { StatisticsComponent } from './statistics/statistics.component';
import { StatisticsDetialsComponent } from './statistics-detials/statistics-detials.component';



import * as CanvasJSAngularChart from '../../../../../assets/canvasjs.angular.component';
import { StatisticsMembersComponent } from './statistics-members/statistics-members.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;
@NgModule({
  declarations: [
    StatisticsComponent,
    StatisticsDetialsComponent,
    StatisticsMembersComponent,
    CanvasJSChart

  ],
  imports: [
    StatisticsRoutingModule,
    SharedModule,
   
  ]
})
export class StockExchangeModule { }
