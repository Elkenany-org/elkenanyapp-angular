import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetPasswordComponent } from './forget-password.component';
import { ForgetPasswordRoutingModule } from './forget-password-routing.module';
import { SharedModule } from '@app/@shared/shared.module';



@NgModule({
  declarations: [ 
    ForgetPasswordComponent
  ],
  imports: [
    ForgetPasswordRoutingModule,
    SharedModule
  ]
})
export class ForgetPasswordModule { }
