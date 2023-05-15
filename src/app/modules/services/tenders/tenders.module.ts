import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TendersRoutingModule } from './tenders-routing.module';
import { TendersComponent } from './tenders/tenders.component';
import { TendersDetailsComponent } from './tenders-details/tenders-details.component';
import { SharedModule } from '@app/@shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { TendersHomeComponent } from './tenders-home/tenders-home.component';
import { ClipboardModule } from 'ngx-clipboard';


@NgModule({
  declarations: [
    TendersComponent,
    TendersDetailsComponent,
    TendersHomeComponent
  ],
  imports: [
    CommonModule,
    TendersRoutingModule,
    SharedModule,
    NgxPaginationModule,
    ClipboardModule,

  ]
})
export class TendersModule { }
