import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
// import { JsonFormData } from '@app/@shared/components/form/cva/cva.component';
import { Banner_test, logo_test } from '@app/modules/home/data';

import { StockExchangeService } from '../_core/stock-exchange.service';
import { CompaniesItems, FilterListSub, FodderCategory, LocalStockFodder} from '@core/interfaces/stock-exchanges/Stock-exchange';
import { BannersLogoservice } from '@app/@core/services/Banners-logos.service';
import { Banner, Logo } from '@app/@core/interfaces/_app/app-response';
import { ApiResponse } from '@app/@core/@data/API/api';
import { JsonFormControls } from '@app/@shared/components/app/horizontal-search/_core/data';
import { ToasterService } from '@app/@shared/services/toastr.service';
import { Location } from '@angular/common';
import { Stock_Search_Form_Data } from '@app/@core/@data/app/stock-exchange/stock-exchange';
import { JsonFormData } from '@app/@core/interfaces/_app/filter-list';

@Component({
  selector: 'app-stock-exchange',
  templateUrl: './stock-exchange.component.html',
  styleUrls: ['./stock-exchange.component.scss']
})



export class StockExchangeComponent implements OnInit {
  
  public loading: boolean= true;
  public carousel_banner?: any = Banner_test;
  public carousel_logos:any = logo_test;
  public h_search_form: JsonFormData | any;
  public stock_Ex_Data?:LocalStockFodder;


  public feeds?: FodderCategory [];
  public companies?:CompaniesItems [];

  temp: any
  company= ''
  type_stock:string =''


  public filterData:{[key:string]:string}= {
    type:"",
    sort:"",
    search:"",
  }

  constructor( 
    private stockExchange: StockExchangeService,
    private route: ActivatedRoute,
    private BannerLogoService:BannersLogoservice,
    private toster:ToasterService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
   ) { }

  ngOnInit(): void {
    this.h_search_form = Stock_Search_Form_Data
    this.route.params.subscribe((prm:Params) => {
      if(prm['type_stock'] === 'fodder') {


        
        this.stockExchange.fodder(prm['id'],'2022-02-12').subscribe( res => {
          console.log('fodder')

          this.BannerLogoService.setBanner(res.data?.banners as Banner[]);
          this.BannerLogoService.setLogo(res.data?.logos as Logo[]);
          this.stock_Ex_Data = res.data  
          this.search_Filter( prm['id'], prm['type'], prm['type_stock'])
          this.stockExchange.feeds_items(prm['id']).subscribe( res => {
            console.log('fodder')
            this.type_stock = prm['type_stock']
            this.feeds = res.data?.fodder_categories.concat(res.data.fodder_list) as FodderCategory[]
            this.loading = false;   
          })
          this.stockExchange.companies_items(prm['id']).subscribe( res => {
            console.log('fodder')

            this.companies= res.data
          })
        })
      }else if(prm['type_stock'] === 'local')
      console.log('local')
      this.stockExchange.local(21,'local','2022-02-12').subscribe( res => {
        this.stock_Ex_Data = res.data  as LocalStockFodder
        this.stockExchange.Filter_list_sub(prm['id'],prm['type'],prm['type_stock']).subscribe((res:ApiResponse<FilterListSub>) => {
          this.search_Filter(prm['id'],prm['type'], prm['type_stock'])
        })
      })
    })
  }


  search_Filter(id:number, type:string, type_stock:string):void {
    this.stockExchange.Filter_list_sub(id, type, type_stock).subscribe((res:ApiResponse<FilterListSub>) => {
      console.log(res)
      this.h_search_form.controls.find((control:JsonFormControls) => control.role === "sector").option = res.data?.sections
      this.h_search_form.controls.find((control:JsonFormControls) => control.role === "stock").option =   res.data?.fodder_sub_sections;
      this.h_search_form.controls.find((control:JsonFormControls) => control.role === "statistics").routerLink =   `/stock-exchange/poultry/statistics/${id}`;
      this.h_search_form.controls.find((control:JsonFormControls) => control.role === "comparison").routerLink =   `/stock-exchange/poultry/comparison/${id}`;
    })

  }
  filter(value: any) {
    // this.stockExchange.LocalStockandFodderSub(5, "", "").subscribe((res) => {
    //   this.stock_Ex_Data = res.data as LocalStockFodder 
    //   this.carousel_banner.banner = res.data?.banners
    //   this.carousel_logos.banner = res.data?.logos
    //   this.loading = false;
    // })
     console.log( value)


    this.toster.loading('حاري التحميل')

    this.route.params.subscribe( params => {


      this.filterData['sector'] = params['type']
      switch ( value.type ) {
        case "sector":
          this.filterData['sector'] = value.name
          break;
        case "date":
          this.filterData['date'] = value.name
          break;
        case "stock":
          this.filterData['stock'] = value.id 
          break;
        default: 
          break;
     }
    })
    console.log(  this.filterData)

    // this.stockExchange.fodder(prm['id'],'2022-02-12').subscribe( res => {
    //   this.BannerLogoService.setBanner(res.data?.banners as Banner[]);
    //   this.BannerLogoService.setLogo(res.data?.logos as Logo[]);
    //   this.stock_Ex_Data = res.data  
    // })

      // this.stockExchange.GetStockExchangeV2( this.filterData['sector'],  this.filterData['sort']).subscribe( res => {
      //   this.toster.stopLoading()

      // // this.stock_Ex_Data = res.data
      // // this.BannerLogoService.setBanner(this.stock_Ex_Data.banners);
      // // this.BannerLogoService.setLogo(this.stock_Ex_Data.logos);

      // this.loading = false;
      // // change url params without reloade with new state
      // this.type = this.filterData['sector']
      // this.location.go(`stock-exchange/${this.type }`);

      // })
  }
}
