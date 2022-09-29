import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "@app/@shared/components/layout/layout.component";

import { SearchComponent } from "../search/search.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { TermsAndConditionsComponent } from "./terms-and-conditions/terms-and-conditions.component";

const routes: Routes = [

  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'terms-and-conditions',
    component: TermsAndConditionsComponent,
  },
    
  ];
  
  // const routes: Routes = [
  //   {
  //     path: '',
  //     component: LayoutComponent,
  //     children
  //   },
  // ];
  
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
  })
  export class StaticRoutingModule {
  }
  