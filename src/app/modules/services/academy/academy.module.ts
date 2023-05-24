import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '@app/@shared/shared.module';
import { AcademyHomeComponent } from './academy-home/academy-home.component';
import { AcademyRoutingModule } from './academy-routing.module';



@NgModule({
  declarations: [
    AcademyHomeComponent,
  ],
  imports: [
    CommonModule,
    AcademyRoutingModule,
    SharedModule,

  ]
})
export class AcademyModule { }
