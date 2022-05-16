import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeGalleryComponent } from './home-gallery/home-gallery.component';
import { GalleryRoutingModule } from './gallery-routing.module';
import { SharedModule } from '@app/@shared/shared.module';
import { GallaryComponent } from './gallary/gallary.component';
import { AboutGallery } from './gallary/about-gallery/about-gallery.component';
import { SpeakersComponent } from './gallary/speakers/speakers.component';
import { ReviewsComponent } from './gallary/reviews/reviews.component';
import { ExhibitorsComponent } from './gallary/exhibitors/exhibitors.component';
import { LightboxModule } from 'ng-gallery/lightbox';
import { GalleryModule} from 'ng-gallery';
import { GalleryCarouelComponent } from '@app/@shared/components/gallery-carouel/gallery-carouel.component';
import { GalleryModule as GalleryModule3 } from '@bmangesh/angular-image-gallery-view'; // <----------------- angular-modal-gallery library import
import { NgxStarRatingModule } from 'ngx-star-rating';



@NgModule({
  declarations: [
    HomeGalleryComponent,
    GallaryComponent,
    AboutGallery,
    SpeakersComponent,
    ReviewsComponent,
    ExhibitorsComponent,
    GalleryCarouelComponent
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    SharedModule,
    GalleryModule.withConfig({
      // thumbView: 'contain',
    }),
    LightboxModule,
    NgxStarRatingModule,
    GalleryModule3.forRoot() // <-------------------------------------------- @ks89/angular-modal-gallery module import

  ]
})
export class GalleryModule2 { }
