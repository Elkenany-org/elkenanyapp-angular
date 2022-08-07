import { NgModule } from '@angular/core';
import { CompaniesGuideRoutingModule } from './companies-guide-routing.module';
import { CompaniesDetailsComponent } from './companies-details/companies-details.component';
import { CoGuideHomeComponent } from './co-guide-home/co-guide-home.component';
import { SharedModule } from '@app/@shared/shared.module';
import { CoGuideComponent } from './co-guide/co-guide.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxStarRatingModule } from 'ngx-star-rating';



@NgModule({
  declarations: [
    CompaniesDetailsComponent,
    CoGuideHomeComponent,
    CoGuideComponent

  ],
  imports: [
    CompaniesGuideRoutingModule,
    SharedModule,
    NgxPaginationModule,
    NgxStarRatingModule
  ]
})
export class CompaniesGuideModule { }
