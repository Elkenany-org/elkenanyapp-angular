import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticRoutingModule } from './static.routing.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/@shared/shared.module';



@NgModule({
  declarations: [
    AboutUsComponent,
    ContactUsComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    
  ],
  imports: [
    CommonModule,
    StaticRoutingModule,
    ReactiveFormsModule ,
    SharedModule

  ]
})
export class StaticPagesModule { 

}
