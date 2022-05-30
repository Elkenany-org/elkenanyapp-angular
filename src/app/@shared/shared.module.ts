import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
/*----------------------   Imports  ----------------------*/
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
/*----------------------   PIPES   ----------------------*/
import * as Shared from './index';
import {RouterModule} from '@angular/router';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SlickCarouselModule,
    NgxSpinnerModule,
    NgxSkeletonLoaderModule,
    NgxChartsModule,
    


  ],
  declarations: [
    ...Shared.pipes,
    ...Shared.components,




  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ...Shared.pipes,
    ...Shared.components
  ]
})
export class SharedModule {
}
