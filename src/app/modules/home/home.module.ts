import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '@app/@shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { IvyCarouselModule } from 'angular-responsive-carousel';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
  HomeRoutingModule,
    SharedModule,
    IvyCarouselModule,
  ]
})
export class HomeModule { }
