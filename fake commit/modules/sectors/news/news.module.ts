import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { NewsRoutingModule } from './news-routing.module';
import { NewsHomeComponent } from './news-home/news-home.component';
import { NewsContentComponent } from './news-content/news-content.component';
import { SharedModule } from '@app/@shared/shared.module';



@NgModule({
  declarations: [
    NewsComponent,
    NewsHomeComponent,
    NewsContentComponent,
    
  ],
  imports: [
    
    NewsRoutingModule,
    SharedModule,
    
  ]
})
export class NewsModule { }
