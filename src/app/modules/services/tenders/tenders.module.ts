import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TendersRoutingModule } from './tenders-routing.module';
import { TendersComponent } from './tenders/tenders.component';
import { TendersDetailsComponent } from './tenders-details/tenders-details.component';
import { SharedModule } from '@app/@shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    TendersComponent,
    TendersDetailsComponent
  ],
  imports: [
    CommonModule,
    TendersRoutingModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class TendersModule { }
