import { NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { AuthGuardService } from '@app/@core/guards/auth.guard';
import { MarketwDetailsResolver } from '@app/@core/resolver/market/market-details-resolver.service';
import { MarketHomeResolver } from '@app/@core/resolver/market/market-home-resolver.service';
import { LayoutComponent } from '@app/@shared/components/layout/layout.component';
import { NotFoundComponent} from '@app/@shared/pages/not-found/not-found.component';
import { AdDetailsComponent } from './ad-details/ad-details.component';
import { AddAdComponent } from './add-ad/add-ad.component';
import { EditAdComponent } from './edit-ad/edit-ad.component';
import { MarketChatComponent } from './market-chat/market-chat.component';
import { MarketHomeComponent } from './market-home/market-home.component';
import { MarketComponent } from './market.component';
import { MyAddsComponent } from './my-adds/my-adds.component';

const routes: Routes = [
  {
    path: '',
    component: MarketComponent,
    children: [
      {
        path: '',
        component: MarketHomeComponent,
        resolve: {
          resolve: MarketHomeResolver
        },
      },
      {
        path: 'edit-ad',
        component: EditAdComponent,
        canActivate: [AuthGuardService]
      },

      {
        path: 'my-ads',
        component: MyAddsComponent,
        canActivate: [AuthGuardService]

      },
      {
        path: 'market-chat/:id',
        component: MarketChatComponent,
        canActivate: [AuthGuardService]
      },
 
    ]
    // component: MarketHomeComponent
  },
  {
    path: 'ad_details/:id',
    component: AdDetailsComponent,
    resolve: {
      resolve: MarketwDetailsResolver
    }
    
  },
  {
    path: 'add-edit-ad/:id',
    component: AddAdComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
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
export class MarketRoutingModule {
}
