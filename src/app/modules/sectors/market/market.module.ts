import { NgModule } from '@angular/core';
import { SharedModule } from '@app/@shared/shared.module';

import { MarketHomeComponent } from './market-home/market-home.component';
import { MarketRoutingModule } from './market-routing.module';
import { AddAdComponent } from './add-ad/add-ad.component';
import { EditAdComponent } from './edit-ad/edit-ad.component';
import { MarketChatComponent } from './market-chat/market-chat.component';
import { MyAddsComponent } from './my-adds/my-adds.component';
import { AdDetailsComponent } from './ad-details/ad-details.component';
import { MarketComponent } from './market.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    MarketComponent,
    AdDetailsComponent,
    MarketHomeComponent,
    AddAdComponent,
    EditAdComponent,
    MarketChatComponent,
    MyAddsComponent
  ],
  imports: [
    MarketRoutingModule,
    SharedModule,
    NgxSpinnerModule,
    SlickCarouselModule,
    NgxPaginationModule,


  ]
})
export class MarketModule { }
