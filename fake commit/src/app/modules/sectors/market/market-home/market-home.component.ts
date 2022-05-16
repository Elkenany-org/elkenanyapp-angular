import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { JsonFormData } from '@app/@shared/components/app/horizontal-search/_core/data';
import { Banner_test, logo_test } from '@app/modules/home/data';
import { MarketService } from '../_core/market.service';
import { map } from 'rxjs';
import { BannersLogoservice } from '@app/@core/services/Banners-logos.service';
import { Location } from '@angular/common';
import { Banner, Logo } from '@app/@core/interfaces/_app/app-response';
import { MarktData } from '@app/@core/interfaces/market/home';
import { market_Search_Form_Data } from '@app/@core/interfaces/market/market-home-data';

@Component({
  selector: 'app-market-home',
  templateUrl: './market-home.component.html',
  styleUrls: ['./market-home.component.scss']
})
export class MarketHomeComponent implements OnInit {

  public loading: boolean = true

  public h_search_form?: JsonFormData  |any // nay be will not work 
  public Market_Data?: MarktData []
  private type!:string

  public filterData:{[key:string]:string}= {
    type:"",
    sort:"",
    search:"",
  }
  constructor(
    private MarketService: MarketService,
    private route: ActivatedRoute, 
    private router: Router,  
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private BannerLogoService:BannersLogoservice,

  ) { }

  ngOnInit(): void {
    this.h_search_form = market_Search_Form_Data //set initial data to horizontal component 

    this.route.params.subscribe(params => {
      this.type =params['type']
      this.MarketService.Filter_list(this.type).subscribe( res => {
        this.h_search_form.controls.find((i:any) => i.role === "sector").option = res.data?.sectors
        this.h_search_form.controls.find((i:any) => i.role === "sort").option =   res.data?.sort;
      })
      
      this.activatedRoute.data.pipe(
        map((data) => {
          return data['resolve'].data
        })
      ).subscribe(res => {  
        this.Market_Data =res.data
        this.BannerLogoService.setBanner( res.banners);
        this.BannerLogoService.setLogo(res.logos);
        this.loading = false;

      })

      // this.MarketService.my_ads(this.type).subscribe(res => {
      //   console.log(res)
      // })
    })


  }

  filter(value:any) {
    this.route.params.subscribe( params => {
      this.filterData['sector'] = params['type']
      switch ( value.type ) {
        case "sector":
          this.filterData['sector'] = value.name
            break;
        case "sort":
          this.filterData['sort'] = value.id 
          break;
        default: 
            // 
            break;
     }

    })

    this.MarketService.market(this.filterData['sector'], this.filterData['sort']).subscribe(res => {

      this.Market_Data =res.data?.data 
      this.BannerLogoService.setBanner( res.data?.banners as Banner[]);
      this.BannerLogoService.setLogo(res.data?.logos as Logo[]);
      this.h_search_form.controls.find((i:any) => i.role === "sector").option =res.data?.sectors
      this.type = this.filterData['sector']
      this.location.go(`market/${this.type }`);
    })
  }

  navigate(id: string): void
  {
    console.log(id)
    this.router.navigate([`/market/${this.type}/ad_details/${id}`]);
  }
}
