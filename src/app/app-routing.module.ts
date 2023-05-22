import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipsTrafficResolver } from './@core/resolver/ships-traffic/ships-traffic-resolver.service';
import { NotFoundComponent } from './@shared/pages/not-found/not-found.component';
import { NewsHomeResolver } from './@core/resolver/news/news-home-resolver.service';
import { AuthGuardService } from './@core/guards/auth.guard';
import { TestComponent } from './test/test.component';
import { TendersHomeResolver } from './@core/resolver/tenders/tenders-home.resolver.service';
import { LinktreeComponent } from './modules/linktree/linktree.component';
import { ComparisonComponent } from './modules/sectors/stock-exchange/comparison/comparison.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
{
  path: "callbak",
  component:TestComponent
},{
  path: 'payment',
  loadChildren: () => 
  import('./modules/payment/payment.module').then((m)=>m.PaymentModule),
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
    path: 'user/setting',

    loadChildren: () => 
      import('./modules/@auth/setting/setting.module').then((m) => m.SettingModule),
      canActivate: [AuthGuardService]
      
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
    loadChildren: () => 
      import('./modules/sectors/stock-exchange/stock-exchange.module').then((m) => m.StockExchangeModule),
      
  },
  {
    path: 'comparison/:id',
    component:ComparisonComponent
      
  },
  {
    path: 'companies-guide/:type',
    loadChildren: () => 
      import('./modules/sectors/companies-guide/companies-guide.module').then((m) => m.CompaniesGuideModule),
      
  },{
    path: 'market/:type',
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
      path: 'magazine/:type',
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
      path:'tenders',
      resolve: {
        resolve: TendersHomeResolver
      },
      loadChildren:()=>
      import('./modules/services/tenders/tenders.module').then(m=> m.TendersModule)
    },
    {
      path:'employment',
      loadChildren:()=>
      import('./modules/services/employment/employment.module').then(m=> m.EmploymentModule)
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
      path: 'company-profile',
      component: LinktreeComponent,
    },
    {
      path: 'service-section',
      loadChildren: () => 
      import('./modules/services/service-section/service-section.module').then(m => m.ServiceSectionModule)
    },
    {
      path: 'consaltants',
      loadChildren: () => 
      import('./modules/services/consaltants/consaltants.module').then(m => m.ConsaltantsModule)
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
];

@NgModule({
  // imports: [RouterModule.forRoot(routes,{useHash: true})],
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],

exports: [RouterModule]
})
export class AppRoutingModule { }
