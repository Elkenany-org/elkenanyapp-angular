import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipsTrafficResolver } from './@core/resolver/ships-traffic/ships-traffic-resolver.service';
import { NotFoundComponent } from './@shared/pages/not-found/not-found.component';
import { NewsHomeResolver } from './@core/resolver/news/news-home-resolver.service';
import { AuthGuardService } from './@core/guards/auth.guard';
import { TendersHomeResolver } from './@core/resolver/tenders/tenders-home.resolver.service';
import { LinktreeComponent } from './modules/linktree/linktree.component';
import { ComparisonComponent } from './modules/sectors/stock-exchange/comparison/comparison.component';
import { AboutUsComponent } from './modules/static-pages/about-us/about-us.component';
import { ContactUsComponent } from './modules/static-pages/contact-us/contact-us.component';
import { PrivacyPolicyComponent } from './modules/static-pages/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './modules/static-pages/terms-and-conditions/terms-and-conditions.component';
import { QuestionsComponent } from './modules/static-pages/questions/questions.component';
import { DrGamalComponent } from './modules/dr-gamal/dr-gamal.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'الرئيسية',
    pathMatch: 'full'
  },
{
  path: 'payment',
  loadChildren: () => 
  import('./modules/payment/payment.module').then((m)=>m.PaymentModule),
},
  {
    path: 'الرئيسية',
    loadChildren: () => 
    import('./modules/home/home.module').then((m) => m.HomeModule),
    
  },
  {
    path: 'تسجيل-الدخول',

    loadChildren: () => 
      import('./modules/@auth/login/login.module').then((m) => m.LoginModule),
      
  },
  {
    path: 'الإعدادات',

    loadChildren: () => 
      import('./modules/@auth/setting/setting.module').then((m) => m.SettingModule),
      canActivate: [AuthGuardService]
      
  },
  {
    path: 'إنشاء-حساب',
    loadChildren: () => 
      import('./modules/@auth/register/register.module').then((m) => m.RegisterModule),
      
  },
  {
    path: 'نسيت-كلمة-السر',
    loadChildren: () => 
      import('./modules/@auth/forget-password/forget-password.module').then((m) => m.ForgetPasswordModule),
      
  },
  {
    path: 'companies-guid',
    loadChildren: () => 
      import('./modules/sectors/companies-guide/companies-guide.module').then((m) => m.CompaniesGuideModule),
      
  },
  {
    path: 'البورصة/:type',
    loadChildren: () => 
      import('./modules/sectors/stock-exchange/stock-exchange.module').then((m) => m.StockExchangeModule),
      
  },
  {
    path: 'مقارنة/:id',
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
      path:'الوظائف',
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
      path: 'من-نحن',
      component: AboutUsComponent,
    },
    {
      path: 'اتصل-بنا',
      component: ContactUsComponent,
    },
    {
      path: 'شروط-الإستخدام-و-الخصوصية',
      component: PrivacyPolicyComponent,
    },
    {
      path: 'الاسئلة-الشائعة',
      component: QuestionsComponent,
    },
    {
      path: 'company-profile',
      component: LinktreeComponent,
    },
    {
      path:'Gamal-Elkenany',
      component: DrGamalComponent,
    },
    {
      path: 'القسم-الخدمي',
      loadChildren: () => 
      import('./modules/services/service-section/service-section.module').then(m => m.ServiceSectionModule)
    },
    {
      path: 'الاستشاريين',
      loadChildren: () => 
      import('./modules/services/consaltants/consaltants.module').then(m => m.ConsaltantsModule)
    },
    {
      path: 'الأكاديمية',
      loadChildren: () => 
      import('./modules/services/academy/academy.module').then(m => m.AcademyModule)
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
];

@NgModule({
  // imports: [RouterModule.forRoot(routes,{useHash: true})],
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', initialNavigation: 'enabledBlocking' })],

exports: [RouterModule]
})
export class AppRoutingModule { }
