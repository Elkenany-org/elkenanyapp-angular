import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StockExchangeService } from '../../../../@core/services/modules/stock-exchange/stock-exchange.service';
import { CompaniesItems, FilterListSub, Fodder, LocalStockFodder} from '@core/interfaces/stock-exchanges/Stock-exchange';
import { BannersLogoservice } from '@app/@core/services/Banners-logos.service';
import { Banner, Logo } from '@app/@core/interfaces/_app/app-response';
import { ApiResponse } from '@app/@core/@data/API/api';
import { Stock_Search_Form_Data } from '@app/@core/@data/app/stock-exchange/stock-exchange';
import { JsonFormData } from '@app/@core/interfaces/_app/filter-list';
import { FormatDate } from '@shared/classes/formatDate';
import { JsonFormControls } from '@app/@core/interfaces/_app/horizontal-search';

@Component({
  selector: 'app-stock-exchange',
  templateUrl: './stock-exchange.component.html',
  styleUrls: ['./stock-exchange.component.scss']
})



export class StockExchangeComponent implements OnInit {
  
  public loading: boolean= false;
  public h_search_form: JsonFormData | any;
  public stock_Ex_Data?:Fodder |LocalStockFodder | any;
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
    this.getDataFromResolver()
    this.route.params.subscribe((prm:Params) => {
    this.search_Filter(prm['id'],prm['type'], prm['type_stock'])
    this.filterData['stock_id']=prm['id'],
    this.filterData['type']=prm['type_stock'] // تاكد منها فيما بعد
    this.filterData['stok']=prm['type_stock'] // تاكد منها فيما بعد

    if(prm['type_stock'] === 'fodder') {
        this.stockExchange.feeds_items(prm['id']).subscribe( res => {
          console.log(res );
          
        this.feeds = res.data?.fodder_list
        this.feedsList = this.feeds
        this.loading = false;   
      })
      this.stockExchange.companies_items(prm['id']).subscribe( res => {
        console.log(res);
        
        this.companies= res.data
        this.companiesList = this.companies
      })
    }
    })
  }


  search_Filter(id:number, type:string, type_stock:string):void {
    this.stockExchange.Filter_list_sub(id, type, type_stock).subscribe((res:ApiResponse<FilterListSub>) => {
      this.h_search_form.controls.find((control:JsonFormControls) => control.role === "sector").option = res.data?.sections
      this.h_search_form.controls.find((control:JsonFormControls) => control.role === "stock").option =   ( type_stock=='local')? res.data?.sub_sections: res.data?.fodder_sub_sections;
      this.h_search_form.controls.find((control:JsonFormControls) => control.role === "statistics").routerLink =   `/stock-exchange/poultry/statistics/statistics-members/${this.filterData['type']}/${id}`;
      this.h_search_form.controls.find((control:JsonFormControls) => control.role === "comparison").routerLink =   `/stock-exchange/poultry/comparison/${id}`;
    })

  }
  filter(value: any) {
    console.log(value);
    
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
    
    this.filterData['stok'] == 'fodder'
    ?this.fodderData(f['stock_id']+'',f['date'],f['feed_id'],f['com_id'])
    :this.localData(f['stock_id']+'',f['date'],)


  }

  toggle(type:string){
    if(type =='company') { 
      this.collapse = (this.collapse == 1)? 0: (this.collapse *0) +1
    }else {
      this.collapse = (this.collapse == 2)? 0: (this.collapse *0) +2
    }
  }


  companySearch(v:any) {
      let temp:any = []
      this.companies?.forEach(i =>  i.name.includes(v)?temp.push(i):console.log(false))
      this.companiesList=temp
      this.companiesList?.length ==0?this.companiesList=this.companies: this.companiesList
  }

  feedsSearch(v:any) {
    
      let temp:any = []
      this.feeds?.forEach(i =>  i.name.includes(v)?temp.push(i):console.log(false))
      this.feedsList=temp
      this.feedsList?.length ==0?this.feedsList=this.feeds: this.feedsList
  }


  nameofcolumn(i:string):number {
    return this.stock_Ex_Data?.columns[this.stock_Ex_Data?.columns.indexOf(i)]
  }



  getDataFromResolver(){
    this.route.data.subscribe(data => {
       this.stock_Ex_Data = data['resolve'].data  as LocalStockFodder
       this.BannerLogoService.setBanner(data['resolve'].data?.banners as Banner[]);
       this.BannerLogoService.setLogo(data['resolve'].data?.logos as Logo[]);
      // this.stock_Ex_Data = res.data   
    })
  }

  fodderData(id:string, date:string,fod_id?:string,comp_id?:string) {
    console.log(id, date,fod_id,comp_id);
    
    this.stockExchange.fodder(id,this.today,fod_id,comp_id).subscribe( res => {
      console.log(res);
      
      this.BannerLogoService.setBanner(res.data?.banners as Banner[]);
      this.BannerLogoService.setLogo(res.data?.logos as Logo[]);
      this.stock_Ex_Data = res.data    
   })
  }

  localData(id:string, data:string,fod_id?:string,comp_id?:string) {
    this.stockExchange.local(id,this.today).subscribe( res => {
      this.BannerLogoService.setBanner(res.data?.banners as Banner[]);
      this.BannerLogoService.setLogo(res.data?.logos as Logo[]);
      this.stock_Ex_Data = res.data    
   })
  }

}
