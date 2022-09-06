import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { SharedModule } from '@app/@shared/shared.module';
import { PaymentRoutingModule } from './Payment.routing.module';



@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    PaymentRoutingModule,
    SharedModule
  ]
})
export class PaymentModule { }
