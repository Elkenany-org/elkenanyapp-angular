import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StockExchangeService } from '../_core/stock-exchange.service';
import { CompaniesItems, FilterListSub, LocalStockFodder} from '@core/interfaces/stock-exchanges/Stock-exchange';
import { BannersLogoservice } from '@app/@core/services/Banners-logos.service';
import { Banner, Logo } from '@app/@core/interfaces/_app/app-response';
import { ApiResponse } from '@app/@core/@data/API/api';
import { JsonFormControls } from '@app/@shared/components/app/horizontal-search/_core/data';
import { Stock_Search_Form_Data } from '@app/@core/@data/app/stock-exchange/stock-exchange';
import { JsonFormData } from '@app/@core/interfaces/_app/filter-list';
import { FormatDate } from '@shared/classes/formatDate';

@Component({
  selector: 'app-stock-exchange',
  templateUrl: './stock-exchange.component.html',
  styleUrls: ['./stock-exchange.component.scss']
})



export class StockExchangeComponent implements OnInit {
  
  public loading: boolean= false;
  public h_search_form: JsonFormData | any;
  public stock_Ex_Data?:any;
  public companiesList?:CompaniesItems[] =[]
  public feedsList?:CompaniesItems[] =[]
  public feeds?:CompaniesItems[] =[]
  public companies?:CompaniesItems [];
  public collapse:number= 0
  public today= new FormatDate().shortDate(Date())

  public filterData:{[key:string]:string}= {
    type:'',
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
    private router: Router
   ) {}

    

  ngOnInit(): void {

    this.h_search_form = Stock_Search_Form_Data






        
    this.route.params.subscribe((prm:Params) => {
      console.log( this.filterData);
      
        this.filterData['stock_id']=prm['id'],
        this.filterData['type']=prm['type_stock'] // تاكد منها فيما بعد
        this.filterData['stok']=prm['type_stock'] // تاكد منها فيما بعد
        this.search_Filter(prm['id'],prm['type'], prm['type_stock'])

        // this.search_Filter( prm['id'], prm['type'], prm['type_stock'])

      if(prm['type_stock'] === 'fodder') {
        this.stockData(prm['id'],'','','')
        this.stockExchange.feeds_items(prm['id']).subscribe( res => {
        this.feeds = res.data?.fodder_categories.concat(res.data.fodder_list) as any[] 
        this.feedsList = this.feeds
        this.loading = false;   
      })

      this.stockExchange.companies_items(prm['id']).subscribe( res => {
        
        this.companies= res.data
        this.companiesList = this.companies
        
      })



      
     }else if(prm['type_stock'] === 'local'){
        this.stockExchange.local(prm['id'],this.today).subscribe( res => {
        let arr:any[] =[]
        console.log(res.data);
        // res.data?.columns.forEach(i => {
        //   console.log(i);
          
        //   // arr.push( i )
        // }   )   
        
        
         this.stock_Ex_Data = res.data  as LocalStockFodder
        // this.stockExchange.Filter_list_sub(prm['id'],prm['type'],prm['type_stock']).subscribe((res:ApiResponse<FilterListSub>) => {
        // })
      })

     }

    })
  }


  search_Filter(id:number, type:string, type_stock:string):void {
    this.stockExchange.Filter_list_sub(id, type, type_stock).subscribe((res:ApiResponse<FilterListSub>) => {
      this.h_search_form.controls.find((control:JsonFormControls) => control.role === "sector").option = res.data?.sections
      this.h_search_form.controls.find((control:JsonFormControls) => control.role === "stock").option =   res.data?.fodder_sub_sections;
      this.h_search_form.controls.find((control:JsonFormControls) => control.role === "statistics").routerLink =   `/stock-exchange/poultry/statistics/statistics-members/${this.filterData['type']}/${id}`;
      this.h_search_form.controls.find((control:JsonFormControls) => control.role === "comparison").routerLink =   `/stock-exchange/poultry/comparison/${id}`;
    })

  }
  filter(value: any) {
    // console.log(value);
    
    // this.stockExchange.LocalStockandFodderSub(5, "", "").subscribe((res) => {
    //   this.stock_Ex_Data = res.data as LocalStockFodder 
    //   this.carousel_banner.banner = res.data?.banners
    //   this.carousel_logos.banner = res.data?.logos
    //   this.loading = false;
    // })

// console.log(value);



    this.route.params.subscribe( params => {


      this.filterData['sector'] = params['type']
      switch ( value.type ) {
        case "sector":
          this.router.navigate(['/stock-exchange',value.name])
          this.filterData['sector'] = value.name
          break;
        case "date":
          this.filterData['date'] = value.name
          break;
        case "stock":
          this.filterData['stock_id'] = value.id
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
    let f= this.filterData
    // console.log(this.filterData);

      this.stockData(f['stock_id']+'',f['date'],f['feed_id'],f['com_id'])



      // this.stock_Ex_Data = res.data
      // this.BannerLogoService.setBanner(this.stock_Ex_Data.banners);
      // this.BannerLogoService.setLogo(this.stock_Ex_Data.logos);


      //this.location.go(`stock-exchange/${this.type }`);

  }


  toggle(type:string){
    if(type =='company') { 
      this.collapse = (this.collapse == 1)? 0: (this.collapse *0) +1
    }else {
      this.collapse = (this.collapse == 2)? 0: (this.collapse *0) +2
    }
  }

  //////////////////





  companySearch(v:any) {
      let temp:any = []
      this.companies?.forEach(i =>  i.name.includes(v)?temp.push(i):console.log(false))
      this.companiesList=temp
      this.companiesList?.length ==0?this.companiesList=this.companies: this.companiesList
  }

  feedsSearch(v:any) {
    console.log(v);
    
      let temp:any = []
      this.feeds?.forEach(i =>  i.name.includes(v)?temp.push(i):console.log(false))
      this.feedsList=temp
      this.feedsList?.length ==0?this.feedsList=this.feeds: this.feedsList
  }

  stockData(id:string, data:string,fod_id?:string,comp_id?:string) {
    
    this.stockExchange.fodder(+id,this.today,fod_id,comp_id).subscribe( res => {
      this.BannerLogoService.setBanner(res.data?.banners as Banner[]);
      this.BannerLogoService.setLogo(res.data?.logos as Logo[]);
      this.stock_Ex_Data = res.data    
      console.log(this.stock_Ex_Data);
      
        

   })
  }

  nameofcolumn(i:string):number {
    // console.log(this.stock_Ex_Data?.columns.indexOf(i));

    return this.stock_Ex_Data?.columns[this.stock_Ex_Data?.columns.indexOf(i)]
    
  }
  column(value:string): string {
    
    if( this.stock_Ex_Data.columns['value']) {

    }else {

    }
    // this.stock_Ex_Data.columns.filter((i:any) => i == value)[0] 
    return ''
  }

}
