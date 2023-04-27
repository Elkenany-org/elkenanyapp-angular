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
  //     description: ' تضم:- البورصة اليومية للسلع، أحدث الأخبار، تتبع حركة السفن، دليل شركات متكامل، فرص المناقصات، سوق تجاري،وظائف، المعارض العالمية، دلائل ومجلات،شركات خدمية ',
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
// this.seoSocialShareService.setData(this.seoData);

 this.home.Home().subscribe( res => {
  this.carousel_logos.banner = res.logos
  this.carousel_banner = res.banner

  this.BannerLogoService.setBanner(res.banner);
  // this.BannerLogoService.setLogo(res.logos);

  this.BannerLogoService.setLogo(res.banner);

  this.BannerLogoService.setMostVisited(res.banner);//attribute will replaces with another response when
  this.BannerLogoService.setNewestServices(res.banner);
  this.BannerLogoService.setQuestions(res.banner);


  // this.BannerLogoService.setBanner(res.banner);
   this.loading = false;

  })


  this.toggleTabs();


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


toggleTabs(){
  // const optListLis = document.querySelectorAll(".about .opt-list li");
  // const optSubList = document.querySelector(".about .opt-sublist");
  // const optSubListLis = document.querySelectorAll(".about .opt-sublist li");
  // const mvCarousel = document.querySelector(".about .mv-carousel");
  // const mrCarousel = document.querySelector(".about .mr-carousel");
  // const cqCarousel = document.querySelector(".about .cq-carousel");

  // for (let index = 0; index < optListLis.length; index++) {
  //   const element = optListLis[index];
  //   if (optListLis[1].classList.contains("active")) {
  //     optSubList?.classList.add("active")
  //   }
  //   element.addEventListener("click", () => {
  //     optListLis.forEach((li) => {
  //       li.classList.remove("active")
  //       element.classList.add("active")
  //     })
  //     if (optListLis[1].classList.contains("active")) {
  //       optSubList?.classList.add("active")
  //     } else {
  //       optSubList?.classList.remove("active")
  //     }
  //     if (optListLis[0].classList.contains("active")) {
  //       cqCarousel?.classList.add("active")

  //     } else {
  //       cqCarousel?.classList.remove("active")
  //     }

  //     if (optSubListLis[1].classList.contains("active")) {
  //       mvCarousel?.classList.add("active")
  //     }
  //     if (optListLis[0].classList.contains("active")) {
  //       mvCarousel?.classList.remove("active")
  //     }
  //     if (optSubListLis[0].classList.contains("active")) {
  //       mrCarousel?.classList.add("active")
  //     } else {
  //       mrCarousel?.classList.remove("active")
  //     }
  //   });

  //   const element2 = optSubListLis[index];
  //   if (optSubListLis[1].classList.contains("active")) {
  //     mvCarousel?.classList.add("active")
  //   }
  //   element2.addEventListener("click", () => {
  //     optSubListLis.forEach((li) => {
  //       li.classList.remove("active")
  //       element2.classList.add("active")
  //     })
  //     if (optSubListLis[1].classList.contains("active")) {
  //       mvCarousel?.classList.add("active")
  //     } else {
  //       mvCarousel?.classList.remove("active")
  //     }

  //     if (optSubListLis[0].classList.contains("active")) {
  //       mrCarousel?.classList.add("active")
  //     } else {
  //       mrCarousel?.classList.remove("active")
  //     }
  //   });
  // }

  const chooseLi = document.querySelector(".about .opt-list .choose")
const cqLi = document.querySelector(".about .opt-list .cq")
const mvLi = document.querySelector(".about .opt-sublist .mv")
const mrLi = document.querySelector(".about .opt-sublist .mr")
const optSubList = document.querySelector(".about .opt-sublist")
let mvCarousel = document.querySelector(".about .mv-carousel")
let mrCarousel = document.querySelector(".about .mr-carousel")
let cqCarousel = document.querySelector(".about .cq-carousel")

chooseLi?.addEventListener("click",()=> {
    chooseLi.classList.add("active")
    mrLi?.classList.remove("active")
    mrCarousel?.classList.remove("active")
    cqLi?.classList.remove("active")
    cqCarousel?.classList.remove("active")
    optSubList?.classList.add("active")
    mvLi?.classList.add("active")
    mvCarousel?.classList.add("active")
})
cqLi?.addEventListener("click",()=> {
    cqLi.classList.add("active")
    cqCarousel?.classList.add("active")
    chooseLi?.classList.remove("active")
    optSubList?.classList.remove("active")
    mvCarousel?.classList.remove("active")
    mrCarousel?.classList.remove("active")
})
mvLi?.addEventListener("click",()=> {
    mvLi.classList.add("active")
    mvCarousel?.classList.add("active")
    mrLi?.classList.remove("active")
    mrCarousel?.classList.remove("active")
})

mrLi?.addEventListener("click",()=> {
  mrLi.classList.add("active")
    mrCarousel?.classList.add("active")
    mvLi?.classList.remove("active")
    mvCarousel?.classList.remove("active")
})

}


}