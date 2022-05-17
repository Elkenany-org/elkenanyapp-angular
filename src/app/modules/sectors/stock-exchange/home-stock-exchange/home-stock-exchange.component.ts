import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiResponse } from '@app/@core/@data/API/api';
import { JsonFormData } from '@app/@shared/components/form/cva/cva.component';
import { map } from 'rxjs';
import { StockExchangeService } from '../_core/stock-exchange.service';
import { Location } from '@angular/common';
import { BannersLogoservice } from '@app/@core/services/Banners-logos.service';
import { ToasterService } from '@app/@shared/services/toastr.service';
import { StockExchange } from '@app/@core/interfaces/stock-exchanges/Stock-exchange';
import { FilterList } from '@app/@core/interfaces/_app/filter-list';
import { Home_Stock_Search_Form_Data } from '@app/@core/@data/app/stock-exchange/stock-exchange';

@Component({
  selector: 'app-stock-exchange',
  templateUrl: './home-stock-exchange.component.html',
  styleUrls: ['./home-stock-exchange.component.scss']
})
export class HomeStockExchangeComponent implements OnInit  {

  public loading: boolean = true

  public h_search_form: JsonFormData | any 
  public stock_Ex_Data?: StockExchange 
  private type?:string
  
  public filterData:{[key:string]:string}= {
    type:"",
    sort:"",
    search:"",
  }
  
  constructor(
    private stockExchange: StockExchangeService,
    private BannerLogoService:BannersLogoservice,
    private route: ActivatedRoute,  
    private activatedRoute: ActivatedRoute,
    private toster:ToasterService,
    private location: Location,
    private router: Router ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(prm => {
      this.h_search_form = Home_Stock_Search_Form_Data
      this.h_search_form.controls[3].routerLink = `/stock-exchange/${prm['type']}/statistics`  
    })


     //set initial data to horizontal component 
    this.activatedRoute.data.pipe(
      map((data) => {
        console.log(data)
       return data
       })
    ).subscribe(res =>{//featch tha data from StockExhangeResolver 
      this.toster.stopLoading()

      this.stock_Ex_Data = res['resolve']  as StockExchange
      console.log(res['resolve'] )
      this.BannerLogoService.setBanner(res['resolve'].banners);
      this.BannerLogoService.setLogo(res['resolve'].logos);
      this.loading = false;      
    })
    this.route.params.subscribe( params => {
      this.type = params['type']

      this.stockExchange.Filter_list(params['type']).subscribe((res:ApiResponse<FilterList>) => {
        //override data to match the data format of horizontal components
        this.h_search_form.controls.find((i:any) => i.role === "sector").option = res.data?.sectors
        this.h_search_form.controls.find((i:any) => i.role === "sort").option =   res.data?.sort;
      }) 
    })   
    



  }

  filter(value:any) {
    this.toster.loading('حاري التحميل')

    this.route.params.subscribe( params => {
      this.filterData['sector'] = params['type']
      switch ( value.type ) {
        case "sector":
          this.filterData['sector'] = value.name
          break;
        case "sort":
          this.filterData['sort'] = value.id 
          break;
        case "search":
          this.filterData['search'] = value.name 
          break;  
        default: 
          break;
     }
    })
    console.log(this.filterData)

      this.stockExchange.GetStockExchangeV2( this.filterData['sector'],  this.filterData['sort'],this.filterData['search']).subscribe( res => {
      this.toster.stopLoading()
      this.stock_Ex_Data = res as StockExchange
      this.BannerLogoService.setBanner(this.stock_Ex_Data.banners);
      this.BannerLogoService.setLogo(this.stock_Ex_Data.logos);
      this.h_search_form.controls.find((i:any) => i.role === "sector").option = this.stock_Ex_Data.sectors
      this.loading = false;
      // change url params without reloade with new state
      this.type = this.filterData['sector']
      this.location.go(`stock-exchange/${this.type }`);

      })

  }

  navigate(id: string): void
  {
    console.log(id)
    // this.router.navigate([`/stock-exchange/poultry/stock-exchange/${id}/${this.type}`]);
  }


  
  navigateV2(data: {id: string, type:string}): void
  {
    console.log('this.type',this.type)
    console.log('data.type', data.type)
    console.log(data)
     this.router.navigate([`/stock-exchange/poultry/stock-exchange/${this.type}/${data.type}/${data.id}`]);
  }

}


