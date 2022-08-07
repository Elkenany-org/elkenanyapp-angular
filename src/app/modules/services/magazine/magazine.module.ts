import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagazineDetailsComponent } from './magazine-details/magazine-details.component';
import { MagazineRoutingModule } from './magazine-routing.module';
import { SharedModule } from '@app/@shared/shared.module';
import { MagazineComponent } from './magazine/magazine.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxStarRatingModule } from 'ngx-star-rating';



@NgModule({
  declarations: [
    MagazineComponent,
    MagazineDetailsComponent,
  ],
  imports: [
    MagazineRoutingModule,
    SharedModule,
    NgxPaginationModule,
    NgxStarRatingModule  ]
})
export class MagazineModule { }
