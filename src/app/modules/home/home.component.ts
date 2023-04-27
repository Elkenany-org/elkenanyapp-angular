import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BannersLogoservice } from '@app/@core/services/Banners-logos.service';
import { HomeService } from '@app/@core/services/modules/home/home.service';

import {  logo_test, Banner_test } from './data'
import { SeoSocialShareData, SeoSocialShareService } from 'ngx-seo';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None

})


export class HomeComponent implements OnInit {
  public loading: boolean = true;
  public carousel_banner?: any  
  public carousel_logos:any = logo_test        
  // public carousel_banner?: any = Banner_test  

  tabs = 'sector'
  //   seoData: SeoSocialShareData = {
  //     title: ' الكناني | الرئيسية ',
  //     ogTitle: ' الكناني | منصة متعددة الخدمات ',
  //     // description: ' تضم:- البورصة اليومية للسلع، أحدث الأخبار، تتبع حركة السفن، دليل شركات متكامل، فرص المناقصات، سوق تجاري،وظائف، المعارض العالمية، دلائل ومجلات،شركات خدمية ',
  //     // url:'https://www.elkenany.com/الرئيسية',
  //     siteName: "elkenany.com",
  // };

  constructor(
    private home:HomeService,
    private BannerLogoService:BannersLogoservice,
    private titleService:Title,
    private readonly seoSocialShareService: SeoSocialShareService
    ) {}


    
ngOnInit(): void {
// this.titleService.setTitle('الكناني | الرئيسية');
this.seoSocialShareService.setTitle('الكناني | منصة متعددة الخدمات');
this.seoSocialShareService.setDescription(' تضم:- البورصة اليومية للسلع، أحدث الأخبار، تتبع حركة السفن، دليل شركات متكامل، فرص المناقصات، سوق تجاري،وظائف، المعارض العالمية، دلائل ومجلات،شركات خدمية ')


this.home.Home().subscribe( res => {
  //  this.carousel_banner.banner = res.banners
  this.carousel_logos.banner = res.logos
  // this.carousel_banner.banner = res.banner

  this.carousel_banner = res.banner
  this.BannerLogoService.setBanner(res.banner);
  this.BannerLogoService.setLogo(res.logos);
  // this.BannerLogoService.setBanner(res.banner);
   this.loading = false;

  })
  }

  swapTab(tab:string) {
    this.tabs= tab
    // console.log(this.tabs)
  }



 carosel(i:any){
    if(i==this.carousel_banner.length-1){
      i=0;
    }
    // console.log(i);
    
}

}