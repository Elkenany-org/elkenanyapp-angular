import { Component, Input, OnInit } from '@angular/core';
import { Banner, Logo } from '@app/@core/interfaces/_app/app-response';
import { BannerConfig, logoConfig } from '@app/@core/interfaces/_app/banner-logo-config';
import { BannersLogoservice } from '@app/@core/services/Banners-logos.service';

@Component({
  selector: 'app-banners-logo',
  templateUrl: './banner-logos.component.html',
  styleUrls: ['./banner-logos.component.scss']
})
export class BannerLogosComponent implements OnInit {
 
  @Input() loading:boolean = true 
  @Input() type:string = '' 

  BannerConfig = BannerConfig 
  LogoConfig = logoConfig 
  constructor(private logoBannerService: BannersLogoservice) { }

  ngOnInit(): void {
    this.BannerConfig.banner=[]
    this.logoBannerService.getBanner().subscribe( res => {
     this.BannerConfig.banner =res as Banner[]
     console.log(BannerConfig.config.class);
     
    })

    this.logoBannerService.getLogo().subscribe( res => {
      this.LogoConfig.banner=[]

      this.LogoConfig.banner =res as Logo[]
     })

     
  }

}
