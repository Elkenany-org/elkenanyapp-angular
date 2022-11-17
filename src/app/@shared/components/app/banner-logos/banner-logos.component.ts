import { Component, Input, OnInit } from '@angular/core';
import { Banner, Logo } from '@app/@core/interfaces/_app/app-response';
import { BannerConfig, logoConfig, logoConfig1 } from '@app/@core/interfaces/_app/banner-logo-config';
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

  BannerConfig = BannerConfig 
  LogoConfig = logoConfig 
  // LogoConfig1 = logoConfig1 
  myClonedArray!:Logo[]
  constructor(
    private logoBannerService: BannersLogoservice,
    private route: Router) { }

  ngOnInit(): void {
    this.BannerConfig.banner=[]
    this.LogoConfig.banner=[]
    // this.LogoConfig1.banner=[]

      this.logoBannerService.getBanner().subscribe( res => {
     this.BannerConfig.banner =res as Banner[]
    })


    if(this.type == 'logo'){
          this.logoBannerService.getLogo().subscribe( res => {
          this.LogoConfig.banner =res as Logo[]
          // if(this.num == '2'){    
          //   this.LogoConfig1.banner = res?.slice().reverse() || [];
          // }

     })
    }


  

  }
  onClick(id:number) {
    window.open(this.BannerConfig.banner.find(i => i.id == id)!.link, "_blank");

  }
}
