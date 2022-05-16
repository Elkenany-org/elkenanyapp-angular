import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetPasswordComponent } from './forget-password.component';
import { ForgetPasswordRoutingModule } from './forget-password-routing.module';



@NgModule({
  declarations: [ 
    ForgetPasswordComponent
  ],
  imports: [
    ForgetPasswordRoutingModule,
  ]
})
export class ForgetPasswordModule { }
