import {NgModule, Optional, SkipSelf} from '@angular/core';
import { SharedModule } from '@app/@shared/shared.module';

import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
  
  ],
  imports: [
    HttpClientModule,
    SharedModule

  ]


})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
