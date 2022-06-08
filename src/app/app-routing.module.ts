import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipsTrafficResolver } from './@core/resolver/ships-traffic/ships-traffic-resolver.service';
import { StockExhangeResolver } from './@core/resolver/stock-exhange-resolver.service';
import { NotFoundComponent } from './@shared/pages/not-found/not-found.component';
import { CompaniesGuideHomeResolver } from './modules/sectors/companies-guide/_core/resolver/companies-guide-home-resolver.service copy 2';
import { MarketHomeResolver } from './modules/sectors/market/_core/resolver/market-home-resolver.service';
import { NewsHomeResolver } from './modules/sectors/news/_core/resolver/news-home-resolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    loadChildren: () => 
    import('./modules/home/home.module').then((m) => m.HomeModule),
    
  },
  {
    path: 'user/login',

    loadChildren: () => 
      import('./modules/@auth/login/login.module').then((m) => m.LoginModule),
      
  },
  {
    path: 'user/register',
    loadChildren: () => 
      import('./modules/@auth/register/register.module').then((m) => m.RegisterModule),
      
  },
  {
    path: 'user/forget-password',
    loadChildren: () => 
      import('./modules/@auth/forget-password/forget-password.module').then((m) => m.ForgetPasswordModule),
      
  },
  {
    path: 'companies-guid',
    loadChildren: () => 
      import('./modules/sectors/companies-guide/companies-guide.module').then((m) => m.CompaniesGuideModule),
      
  },
  {
    path: 'stock-exchange/:type',
    resolve: {
      resolve: StockExhangeResolver
    },
    loadChildren: () => 
      import('./modules/sectors/stock-exchange/stock-exchange.module').then((m) => m.StockExchangeModule),
      
  },
  {
    path: 'companies-guide/:type',
    resolve: {
      resolve: CompaniesGuideHomeResolver
    },
    loadChildren: () => 
      import('./modules/sectors/companies-guide/companies-guide.module').then((m) => m.CompaniesGuideModule),
      
  },{
    path: 'market/:type',
    resolve: {
      resolve: MarketHomeResolver
    },
    loadChildren: () => 
      import('./modules/sectors/market/market.module').then((m) => m.MarketModule),
      
  },{
    path: 'news/:type',
    resolve: {
      resolve: NewsHomeResolver
    },
    loadChildren: () => 
      import('./modules/sectors/news/news.module').then((m) => m.NewsModule),
      
    },{
      path: 'magazine',
      loadChildren: () => 
        import('./modules/services/magazine/magazine.module').then((m) => m.MagazineModule),
        
    },
    {
      path: 'gallery/:type',
      loadChildren: () => 
        import('./modules/services/gallery/gallery.module').then( m => m.GalleryModule2)
    },
    {
      path: 'ships-traffic',
      resolve: {
        resolve: ShipsTrafficResolver
      },
      
      loadChildren: () => 
      import('./modules/services/ships-traffic/ships-traffic.module').then( m => m.ShipsTrafficModule)
    },
    {
      path:'search',
      loadChildren: () => 
      import('./modules/search/search.module').then(m => m.PagesModule)
    },
    {
      path:'static-pages',
      loadChildren: () => 
      import('./modules/static-pages/static-pages.module').then(m => m.StaticPagesModule)
    },

 
    {
      path: '**',
      component: NotFoundComponent,
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
exports: [RouterModule]
})
export class AppRoutingModule { }
