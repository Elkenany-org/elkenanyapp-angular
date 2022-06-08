import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdDetails } from '@app/@core/interfaces/market/ad-detials';
import { StartChat } from '@app/@core/interfaces/market/chat';
import { Banner, Logo } from '@app/@core/interfaces/_app/app-response';
import { BannerConfig, logoConfig } from '@app/@core/interfaces/_app/banner-logo-config';
import { BannersLogoservice } from '@app/@core/services/Banners-logos.service';

import { MarketService } from '../_core/market.service';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.scss']
})
export class AdDetailsComponent implements OnInit {
  public adDetails?: AdDetails;
  public loading: boolean=false
  public startChat?: StartChat;

  constructor(
    private marketService: MarketService,
    private route: ActivatedRoute,
    private Market: MarketService,
    private router: Router,
    private BannerLogoService:BannersLogoservice,

    ) { }
    BannerConfig = BannerConfig 
    logoConfig = logoConfig
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      data['resolve']
      this.adDetails = data['resolve'].data 
      this.BannerLogoService.setBanner(data['resolve'].data?.banners as Banner[]);
      this.BannerLogoService.setLogo(data['resolve'].data?.logos as Logo[]);
      this.BannerConfig.banner= data['resolve'].data?.images as any[]
      this.logoConfig.banner= data['resolve'].data?.images as any[]
    })
  }


  
  start_chat(): void {
    this.Market.start_chat(this.adDetails?.id ).subscribe( res => {
      this.startChat =res.data
      this.router.navigate([`/market/poultry/market-chat/${this.adDetails?.id}`] )

      // this.router.navigate(['market-chat',{id: this.adDetails?.id}] )
      console.log( this.startChat)
    })
  }

}
