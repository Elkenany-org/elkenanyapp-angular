import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShipsTrafficStatisticsDetailsResolver } from "@app/@core/resolver/ships-traffic/ships-traffic-statistics-details-resolver.service";
import { ShipsTrafficStatisticsResolver } from "@app/@core/resolver/ships-traffic/ships-traffic-statistics-resolver.service";
import { LayoutComponent } from "@app/@shared/components/layout/layout.component";
import { ShipsTrafficStatisticsDetailsComponent } from "./ships-traffic-statistics-details/ships-traffic-statistics-details.component";
import { ShipsTrafficStatisticsComponent } from "./ships-traffic-statistics/ships-traffic-statistics.component";
import { ShipsTrafficComponent } from "./ships-traffic/ships-traffic.component";



const children:Routes= [
    {
        path: '',
        component: ShipsTrafficComponent
    },
    {
        path: 'statistics',
        resolve:{
            resolve: ShipsTrafficStatisticsResolver
        },
        component: ShipsTrafficStatisticsComponent
    },
    {
        path:'statistics-details/:id/:country',
        resolve:{
            resolve: ShipsTrafficStatisticsDetailsResolver
        },
        component:ShipsTrafficStatisticsDetailsComponent
    }
]

const Routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children
    }
]

@NgModule({
    imports:[RouterModule.forChild(Routes)],
exports:[RouterModule]
})

export class ShipsTrafficRoutingModule {}