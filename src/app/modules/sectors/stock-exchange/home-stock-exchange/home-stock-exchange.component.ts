import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiResponse } from '@app/@core/@data/API/api';
import { map } from 'rxjs';
import { StockExchangeService } from '../../../../@core/services/modules/stock-exchange/stock-exchange.service';
import { Location } from '@angular/common';
import { BannersLogoservice } from '@app/@core/services/Banners-logos.service';
import { StockExchange } from '@app/@core/interfaces/stock-exchanges/Stock-exchange';
import { FilterList } from '@app/@core/interfaces/_app/filter-list';
import { Home_Stock_Search_Form_Data } from '@app/@core/@data/app/stock-exchange/stock-exchange';
import { JsonFormData } from '@app/@core/interfaces/_app/horizontal-search';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-stock-exchange',
  templateUrl: './home-stock-exchange.component.html',
  styleUrls: ['./home-stock-exchange.component.scss']
})
export class HomeStockExchangeComponent implements OnInit  {

  public loading: boolean = false

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
    private location: Location,
    private router: Router , private titleService:Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("البورصة اليومية");

      this.h_search_form = Home_Stock_Search_Form_Data



     //set initial data to horizontal component 
    this.activatedRoute.data.pipe(
      map((data) => {
       return data
       })
    ).subscribe(res =>{//featch tha data from StockExhangeResolver 
      this.stock_Ex_Data = res['resolve']  as StockExchange
      this.BannerLogoService.setBanner(res['resolve'].banners);
      this.BannerLogoService.setLogo(res['resolve'].logos);

      
      this.loading = false;      
    })
    this.route.params.subscribe( params => {
      this.type = params['type']
      this.filterData['sector'] = params['type']

      this.stockExchange.Filter_list(params['type']).subscribe((res:ApiResponse<FilterList>) => {
        //override data to match the data format of horizontal components
        this.h_search_form.controls.find((i:any) => i.role === "sector").option = res.data?.sectors
        this.h_search_form.controls.find((i:any) => i.role === "sort").option =   res.data?.sort;
        this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id !== 0).selected=0
        this.h_search_form.controls.find((i:any) => i.role === "sort").option.unshift({"id": 0,"name": "الأكثر أهمية","value": ''})


    let title=this.h_search_form.controls.find((i:any) => i.role === "sector").option.find((i: { selected: number; })=>i.selected==1).name
    localStorage.setItem('stockTitle',' القسم '+title)
    this.filterData['sector'] = this.h_search_form.controls.find((i:any) => i.role === "sector").option.find((i:any) => i.selected == 1).id
    this.location.go(`/البورصة/${this.filterData['sector'] }`); 
    
    this.h_search_form.controls[3].routerLink = `/البورصة/${this.filterData['sector']}/إحصائيات`  

      }) 
      
    })   


  }

  filter(value:any) {
let sort='';
    this.route.params.subscribe( params => {
      
      switch ( value.type ) {
        case "sector":

          
          this.filterData['sector'] = value.id
          this.type = this.filterData['sector']
          this.router.navigate(['البورصة/',this.type])
  
          break;
        case "sort":
            this.filterData['sort'] = value.id 
            this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id === value.id).selected=1
            this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id !== value.id).selected=0

            sort = this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id === value.id).value

          break;
        case "search":
          this.filterData['search'] = value.name 
          break;  
        default: 
          break;
     }
    })
//  console.log( this.h_search_form.controls.find((i:any) => i.role === "sort").option);

if(value.type != 'sector'){


      this.stockExchange.GetStockExchangeV2( this.filterData['sector'],  sort ,this.filterData['search']).subscribe( res => {

      this.stock_Ex_Data = res as StockExchange
      this.BannerLogoService.setBanner(this.stock_Ex_Data.banners);
      this.BannerLogoService.setLogo(this.stock_Ex_Data.logos);
      this.h_search_form.controls.find((i:any) => i.role === "sector").option = this.stock_Ex_Data.sectors

      this.loading = false;

      })
      }
      let title=this.h_search_form.controls.find((i:any) => i.role === "sector").option.find((i: { selected: number; })=>i.selected==1).name
      localStorage.setItem('stockTitle',' القسم '+title)
  }

  navigate(id: string): void
  {
    // this.router.navigate([`/stock-exchange/poultry/stock-exchange/${id}/${this.type}`]);
  }



  navigateV2(data: {id: string, type:string}): void
  {     let temp =data.type
        if(data.type ==='local' ){
          temp = 'المحلية';
        }else if(data.type ==='fodder' ) {  
          temp='الأعلاف';
        }
         this.router.navigate([`/البورصة/${this.filterData['sector']}/${temp}/${data.id}`])


  }

}


