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
import { Location } from '@angular/common';
import { Stock_Search_Form_Data } from '@app/@core/@data/app/stock-exchange/stock-exchange';
import { JsonFormData } from '@app/@core/interfaces/_app/filter-list';
import { ToasterService } from '@shared/services/toastr.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { map } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Companies } from '@app/@core/interfaces/companies-guid/co-companies';

@Component({
  selector: 'app-stock-exchange',
  templateUrl: './stock-exchange.component.html',
  styleUrls: ['./stock-exchange.component.scss']
})



export class StockExchangeComponent implements OnInit {
  
  public loading: boolean= false;
  public carousel_banner?: any = Banner_test;
  public carousel_logos:any = logo_test;
  public h_search_form: JsonFormData | any;
  public stock_Ex_Data?:any;
///////////////////////////////////


companiesList?:CompaniesItems[] =[]
feedsList?:CompaniesItems[] =[]

/////////////////////////////////

  public feeds?:CompaniesItems[] =[]
  public companies?:CompaniesItems [];

  temp: any
  company= ''
  type_stock:string =''
  open:boolean= false
  collapse:number= 0


  

  public filterData:{[key:string]:string}= {
    id:'',
    sector:"",
    stock_id:"",
    date:'',
    com_id:"",
    feed_id:''
  }

  constructor( 
    private stockExchange: StockExchangeService,
    private route: ActivatedRoute,
    private BannerLogoService:BannersLogoservice,
    private toster:ToasterService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder//////////
   ) {



    }

    

  ngOnInit(): void {






        
    this.h_search_form = Stock_Search_Form_Data
    this.route.params.subscribe((prm:Params) => {
        this.filterData['id']=prm['id'],
        this.filterData['stok']=prm['type_stock']

      


      if(prm['type_stock'] === 'fodder') {
        console.log('fodder')



       this.stockExchange.fodder(prm['id'],'','','').subscribe( res => {
          this.BannerLogoService.setBanner(res.data?.banners as Banner[]);
          this.BannerLogoService.setLogo(res.data?.logos as Logo[]);
          this.stock_Ex_Data = res.data           
          this.search_Filter( prm['id'], prm['type'], prm['type_stock'])

          this.stockExchange.feeds_items(prm['id']).subscribe( res => {
            console.log(res);
            
            this.type_stock = prm['type_stock']
            this.feeds = res.data?.fodder_categories.concat(res.data.fodder_list) as any[] 
            this.feedsList = this.feeds
            console.log( res.data?.fodder_categories.concat(res.data.fodder_list) );
            
            this.loading = false;   
          })

          this.stockExchange.companies_items(prm['id']).subscribe( res => {
            console.log(res.data);
            
            this.companies= res.data
            this.companiesList = this.companies
            console.log(this.companies);
            
          })
       })
     }else if(prm['type_stock'] === 'local')
      console.log('local')
      // .stockExchange.local(21,'local','2022-02-12').subscribe( res => {
      //   this.stock_Ex_Data = res.data  as LocalStockFodder
      //   this.stockExchange.Filter_list_sub(prm['id'],prm['type'],prm['type_stock']).subscribe((res:ApiResponse<FilterListSub>) => {
      //     this.search_Filter(prm['id'],prm['type'], prm['type_stock'])
      //   })
      // })
    })
  }


  search_Filter(id:number, type:string, type_stock:string):void {
    this.stockExchange.Filter_list_sub(id, type, type_stock).subscribe((res:ApiResponse<FilterListSub>) => {
      this.h_search_form.controls.find((control:JsonFormControls) => control.role === "sector").option = res.data?.sections
      this.h_search_form.controls.find((control:JsonFormControls) => control.role === "stock").option =   res.data?.fodder_sub_sections;
      this.h_search_form.controls.find((control:JsonFormControls) => control.role === "statistics").routerLink =   `/stock-exchange/poultry/statistics/${id}`;
      this.h_search_form.controls.find((control:JsonFormControls) => control.role === "comparison").routerLink =   `/stock-exchange/poultry/comparison/${id}`;
    })

  }
  filter(value: any) {
    console.log(value);
    
    // this.stockExchange.LocalStockandFodderSub(5, "", "").subscribe((res) => {
    //   this.stock_Ex_Data = res.data as LocalStockFodder 
    //   this.carousel_banner.banner = res.data?.banners
    //   this.carousel_logos.banner = res.data?.logos
    //   this.loading = false;
    // })




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
          this.filterData['stock_id'] = value.name
          break;
        case "com_id":
            this.filterData['com_id'] = value.id 
            break;
        case "feed_id":
            this.filterData['feed_id'] = value.id 
            break;

        default: 
          break;
     }
    })
  console.log(this.filterData);

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


  toggle(type:string){
    if(type =='company') { 
      this.collapse = (this.collapse == 1)? 0: (this.collapse *0) +1
    }else {
      this.collapse = (this.collapse == 2)? 0: (this.collapse *0) +2
    }
  }

  //////////////////





  filter2(v:any) {
    console.log(v);
    
      let temp:any = []
      this.companies?.forEach(i =>  i.name.includes(v)?temp.push(i):console.log(false))
      this.companiesList=temp
      this.companiesList?.length ==0?this.companiesList=this.companies: this.companiesList
      console.log(this.companiesList);
      
    
  }

  feedsFilter(v:any) {
    console.log(v);
    
      let temp:any = []
      this.feeds?.forEach(i =>  i.name.includes(v)?temp.push(i):console.log(false))
      this.feedsList=temp
      this.feedsList?.length ==0?this.feedsList=this.feeds: this.feedsList
      console.log(this.feedsList);
      
  }


}
