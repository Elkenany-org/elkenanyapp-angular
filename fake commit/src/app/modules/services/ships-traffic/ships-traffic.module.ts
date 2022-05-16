import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipsTrafficRoutingModule } from './ships-traffic-routing.module';
import { ShipsTrafficStatisticsComponent } from './ships-traffic-statistics/ships-traffic-statistics.component';
import { ShipsTrafficComponent } from './ships-traffic/ships-traffic.component';
import { SharedModule } from '@app/@shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ShipsTrafficStatisticsDetailsComponent } from './ships-traffic-statistics-details/ships-traffic-statistics-details.component';



@NgModule({
  declarations: [
    ShipsTrafficComponent,
    ShipsTrafficStatisticsComponent,
    ShipsTrafficStatisticsDetailsComponent
  ],
  imports: [
    CommonModule,
    ShipsTrafficRoutingModule,
    SharedModule,
    NgxChartsModule
  ]
})
export class ShipsTrafficModule { }
