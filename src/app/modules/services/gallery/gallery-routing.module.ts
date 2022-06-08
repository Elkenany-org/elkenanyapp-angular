import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '@app/@shared/components/layout/layout.component';
import { HomeGalleryComponent } from './home-gallery/home-gallery.component';
import { GallaryComponent } from './gallary/gallary.component';
import { AboutGallery } from './gallary/about-gallery/about-gallery.component';
import { ReviewsComponent } from './gallary/reviews/reviews.component';
import { ExhibitorsComponent } from './gallary/exhibitors/exhibitors.component';
import { SpeakersComponent } from './gallary/speakers/speakers.component';
import { GalleriesResolver } from '@app/@core/resolver/gallery/galleries-resolver.service copy';


const children:Routes = [
  {
    path: '',
    component: HomeGalleryComponent,
    resolve: {
      resolve: GalleriesResolver
    }
  },
  {
    path: ':id',
    component: GallaryComponent,
    children: [
      {
        path: '',
        redirectTo: 'about',
        pathMatch: 'full'
      },
      {
        path: 'about',
        component: AboutGallery
      },
      {
        path: 'reviews',
        component: ReviewsComponent
      },
      {
        path: 'exhibitors',
        component: ExhibitorsComponent
      },
      {
        path: 'speakers',
        component: SpeakersComponent
      }
      
    ]
  },
]


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class GalleryRoutingModule { }
