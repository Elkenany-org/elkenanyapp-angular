import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceSectionRoutingModule } from './service-section-routing.module';
import { ServiceSectionComponent } from './service-section.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { SharedModule } from '@app/@shared/shared.module';


@NgModule({
  declarations: [
    ServiceSectionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ServiceSectionRoutingModule,
    NgxPaginationModule,
    NgxStarRatingModule
  ]
})
export class ServiceSectionModule { }
