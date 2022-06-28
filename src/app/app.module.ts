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
            provider: new FacebookLoginProvider('385135266931682'),
          },
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('183599233401-1va3epdfv0gfeesi5q2re14ro4fea4ah.apps.googleusercontent.com'),
          },
        ],onError:(err) => {
          console.log(err)
        }
      } as SocialAuthServiceConfig,
    },

    SocialAuthService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
