import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticRoutingModule } from './static.routing.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';



@NgModule({
  declarations: [
    AboutUsComponent,
    ContactUsComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent
  ],
  imports: [
    CommonModule,
    StaticRoutingModule
  ]
})
export class StaticPagesModule { 

}
