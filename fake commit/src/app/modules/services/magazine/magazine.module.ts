import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagazineDetailsComponent } from './magazine-details/magazine-details.component';
import { MagazineRoutingModule } from './magazine-routing.module';
import { SharedModule } from '@app/@shared/shared.module';
import { MagazineComponent } from './magazine/magazine.component';



@NgModule({
  declarations: [
    MagazineComponent,
    MagazineDetailsComponent,
  ],
  imports: [
    MagazineRoutingModule,
    SharedModule,  ]
})
export class MagazineModule { }
