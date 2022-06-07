import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BannersLogoservice } from '@app/@core/services/Banners-logos.service';
import {delay} from 'rxjs/operators';

import {  logo_test, Banner_test } from './data'
import { HomeService } from './_core/home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None

})


export class HomeComponent implements OnInit {
  loading: boolean = true;
  
  public carousel_banner?: any = Banner_test  
  public carousel_logos:any = logo_test        

  tabs = 'sector'

  constructor(
    private home:HomeService,
    private BannerLogoService:BannersLogoservice,
    ) {}



    
ngOnInit(): void {

 this.home.Home().subscribe( res => {
  //  this.carousel_banner.banner = res.banners
  this.carousel_logos.banner = res.logos
  this.carousel_banner.banner = res.banner
  this.BannerLogoService.setLogo(res.logos);
  this.BannerLogoService.setBanner(res.banner);

   this.loading = false;

  })
  }

  swapTab(tab:string) {
    this.tabs= tab
    console.log(this.tabs)
  }





}