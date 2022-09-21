import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsaltantsRoutingModule } from './consaltants-routing.module';
import { ConsaltantsHomeComponent } from './consaltants-home/consaltants-home.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorsDetailsComponent } from './doctors-details/doctors-details.component';


@NgModule({
  declarations: [
    ConsaltantsHomeComponent,
    DoctorsComponent,
    DoctorsDetailsComponent
  ],
  imports: [
    CommonModule,
    ConsaltantsRoutingModule
  ]
})
export class ConsaltantsModule { }
