import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './@core/core.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './@core/interceptors/token.interceptor';


import {
  FacebookLoginProvider,
  SocialLoginModule,
  SocialAuthServiceConfig,
  SocialAuthService,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { TestComponent } from './test/test.component';
  ``
  import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { environment } from 'environments/environment';


// ng g c modules/services/gallery/home-gallery --skipTests=true --module=gallery
@NgModule({
  declarations: [
    AppComponent,
    TestComponent // for test only 
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    // NgxSkeletonLoaderModule,
    BrowserAnimationsModule, 
    CollapseModule.forRoot(), BsDropdownModule.forRoot(),

    CoreModule,


  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1504415433364556'),
          },
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('552649577410-qs09ipcibvdfcfd97phi3drru3qufis0.apps.googleusercontent.com'),
            plugin_name:'google login project1'

          },
        ],onError:(err) => {
          // console.log(err)
        }
      } as SocialAuthServiceConfig,
    },

    SocialAuthService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
