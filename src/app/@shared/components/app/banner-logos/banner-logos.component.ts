import { Component, Input, OnInit } from '@angular/core';
import { Banner, Logo } from '@app/@core/interfaces/_app/app-response';
import { BannerConfig, HowtouseConfig, MainBannerConfig, logoConfig, logoConfig1, mostvisitedConfig, newestservicesConfig, questionsConfig } from '@app/@core/interfaces/_app/banner-logo-config';
import { BannersLogoservice } from '@app/@core/services/Banners-logos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banners-logo',
  templateUrl: './banner-logos.component.html',
  styleUrls: ['./banner-logos.component.scss']
})
export class BannerLogosComponent implements OnInit {
 x=0;
  @Input() loading:boolean = true 
  @Input() type:string = '' 
  @Input() num:string = '' 

  pageTitle :string | undefined 
  BannerConfig = BannerConfig 
  LogoConfig = logoConfig
  mainbannerConfig= MainBannerConfig //done
  mostvisitedConfig = mostvisitedConfig
  newestservicesConfig = newestservicesConfig 
  howtouseConfig = HowtouseConfig

  myClonedArray!:Logo[]
  constructor(
    private logoBannerService: BannersLogoservice,
    private route: Router,
) { }

  ngOnInit(): void {
 

    this.BannerConfig.banner=[]
    this.LogoConfig.banner=[]
    this.mainbannerConfig.banner=[]
    this.mostvisitedConfig.banner=[]
    this.newestservicesConfig.banner=[]
    this.howtouseConfig.banner=[]

    this.logoBannerService.getBanner().subscribe( res => {
     this.BannerConfig.banner =res as Banner[]
    })

    this.logoBannerService.getBanner().subscribe( res => {
      this.mainbannerConfig.banner =res as Banner[]
      console.log('====================================');
      console.log(this.mainbannerConfig.banner);
      console.log('====================================');
    })

    if(this.type == 'mostvisited'){

     this.logoBannerService.getMostVisited().subscribe( res => {
      this.mostvisitedConfig.banner =res as Banner[]
    })
  }

    if(this.type == 'newestservices'){

    this.logoBannerService.getNewestServices().subscribe( res => {
      this.newestservicesConfig.banner =res as Banner[]  
    })
  }

  if(this.type == 'howtouse'){

    this.logoBannerService.getHowtouse().subscribe( res => {
      this.howtouseConfig.banner =res as Banner[]

    })
  }
    if(this.type == 'logo'){
          this.logoBannerService.getLogo().subscribe( res => {
          this.LogoConfig.banner =res as Logo[]
     })
    }


  

  }
  onClick(id:number) {
    window.open(this.BannerConfig.banner.find(i => i.id == id)!.link, "_blank");
    window.open(this.mainbannerConfig.banner.find(i => i.id == id)!.link, "_blank");

  }
}
