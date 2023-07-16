import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StockExchangeService } from '../../../../@core/services/modules/stock-exchange/stock-exchange.service';
import { CompaniesItems, FilterListSub, Fodder, LocalStockFodder} from '@core/interfaces/stock-exchanges/Stock-exchange';
import { BannersLogoservice } from '@app/@core/services/Banners-logos.service';
import { Banner, Logo } from '@app/@core/interfaces/_app/app-response';
import { ApiResponse } from '@app/@core/@data/API/api';
import { Stock_Search_Form_Data, Stock_Search_Form_Data_Local } from '@app/@core/@data/app/stock-exchange/stock-exchange';
import { JsonFormData } from '@app/@core/interfaces/_app/filter-list';
import { FormatDate } from '@shared/classes/formatDate';
import { JsonFormControls } from '@app/@core/interfaces/_app/horizontal-search';

import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

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
  public flag=false;
 public stock_type:string = 'local';
  public filterData:{[key:string]:string}= {
    type:'',
    id:'',
    sector:"",
    stock_id:"",
    date:'',
    com_id:"",
    feed_id:''
  }
  public productList?:CompaniesItems[] =[]

  constructor( 
    private stockExchange: StockExchangeService,
    private route: ActivatedRoute,
    private BannerLogoService:BannersLogoservice,
    private router: Router,
    private location: Location,
    private titleService:Title
   ) {}

  ngOnInit(): void {

    this.getDataFromResolver()

    this.route.params.subscribe((prm:Params) => {
    if( prm['type_stock'] === 'المحلية'){
      this.stock_type='local';
      // this.filterData['type']='local';
    }else 
    if(prm['type_stock'] === 'الأعلاف') {  
      this.stock_type='fodder';
      // this.filterData['type']='fodder';

    }

    this.search_Filter(prm['id'],prm['type'], this.stock_type)
    this.filterData['stock_id']=prm['id']
    this.filterData['type']=prm['type_stock'] // تاكد منها فيما بعد
    this.filterData['stok']=this.stock_type // تاكد منها فيما بعد
    this.filterData['sector']=prm['type']


    if(this.stock_type === 'fodder') {  
        this.h_search_form = Stock_Search_Form_Data

        this.stockExchange.feeds_items(prm['id']).subscribe( res => {

        this.feeds = res.data?.fodder_list
        this.feedsList = this.feeds
        this.productList=JSON.parse(JSON.stringify(this.feedsList));  
        let temp= this.productList?.find(i=> i.selected==1);
        document.getElementById('product')!.innerText =temp?.name!
         this.loading = false; 
      })
      this.stockExchange.companies_items(prm['id']).subscribe( res => {
        
        this.companies= res.data
        this.companiesList = this.companies
        let temp=this.companiesList![0].id+''
        localStorage.setItem('stockId',temp)
      })
    }else{
      this.h_search_form = Stock_Search_Form_Data_Local
    }
    })

  }

  search_Filter(id:number, type:string, type_stock:string):void {
    this.stockExchange.Filter_list_sub(id, type, type_stock).subscribe((res:ApiResponse<FilterListSub>) => {
      this.h_search_form.title =   ( type_stock=='local')? res.data?.sub_sections.find(i=> i.id==id)?.name: res.data?.fodder_sub_sections.find(i=> i.id==id)?.name;
      localStorage.setItem('title',this.h_search_form.title)
      this.titleService.setTitle(this.h_search_form.title);
      this.h_search_form.controls.find((control:JsonFormControls) => control.role === "sector").option = res.data?.sections
      this.h_search_form.controls.find((control:JsonFormControls) => control.role === "stock").option =   ( type_stock=='local')? res.data?.sub_sections: res.data?.fodder_sub_sections;

      this.h_search_form.controls.find((control:JsonFormControls) => control.role === "statistics").routerLink =   `/البورصة/${this.filterData['sector']}/إحصائيات/${this.filterData['type']}/${id}`;
      if(type_stock !='local'){
              this.h_search_form.controls.find((control:JsonFormControls) => control.role === "comparison").routerLink =   `/مقارنة/${id}`;
      }
    })


  }
  filter(value: any) {
  
    this.route.params.subscribe( params => {
      //  console.log(params);
      
      this.filterData['sector'] = params['type']
      switch ( value.type ) {
        case "sector":
          this.router.navigate(['/البورصة',value.id])
          this.filterData['sector'] = value.id
          localStorage.setItem('stockTitle',value.title)

          break;
        case "date":
          this.filterData['date'] = value.name
          // console.log('date'+value.name);    
      
          break;
        case "stock":

          if(this.filterData['stok'] == 'fodder'){
          document.getElementById('company')!.innerText = 'لا يوجد اي اختيار';
          document.getElementById('product')!.innerText = 'لا يوجد اي اختيار';
          }
  
          // this.filterData['date']=''
          // this.h_search_form.controls.find((control:JsonFormControls) => control.role === "date");
    
          this.h_search_form.title = value.title;
          this.filterData['stock_id'] = value.id
          localStorage.setItem('title',value.title)
          this.titleService.setTitle(value.title);
          this.filterData['feed_id'] = ''
          this.filterData['com_id'] = '' 
          this.filterData['date'] = ''

          this.router.navigate(['/البورصة/'+params['type']+'/'+params['type_stock']+'/'+value.id]);


          break;
        case "com_id":
            this.filterData['com_id'] = value.id 
            this.filterData['feed_id'] = ''
           document.getElementById('company')!.innerText = value.name;
          //  document.getElementById('company')!.innerText = 'الكل';
          document.getElementById('product')!.innerText = 'لا يوجد اي اختيار';

            break;
        case "feed_id":
            this.filterData['feed_id'] = value.id 
            this.filterData['com_id'] = '' 
            document.getElementById('company')!.innerText = 'الكل';

            document.getElementById('product')!.innerText = value.name;

            break;
        default: 
          break;
     }
    })
    if(value.type != "stock"){
    let f= this.filterData
    this.filterData['stok'] == 'fodder'
    ?this.fodderData(f['stock_id']+'',f['date'],f['feed_id'],f['com_id'],value.type)
    :this.localData(f['stock_id']+'',f['date'],)
    
    }

    // this.nameofstock.emit(value.title);
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

    })

  }

  fodderData(id:any, date:string,fod_id?:string,comp_id?:string,type?:string) {

    this.stockExchange.fodder(id,date,fod_id,comp_id).subscribe( res => {

      this.BannerLogoService.setBanner(res.data?.banners as Banner[]);
      this.BannerLogoService.setLogo(res.data?.logos as Logo[]);
      this.stock_Ex_Data = res.data    

        this.flag=false
          },
          err =>{
          this.flag=true;
        })
        
  }

  localData(id:string, data:string,fod_id?:string,comp_id?:string) {
    this.stockExchange.local(id,data).subscribe( res => {
      this.BannerLogoService.setBanner(res.data?.banners as Banner[]);
      this.BannerLogoService.setLogo(res.data?.logos as Logo[]);
      this.stock_Ex_Data = res.data    
      this.flag=false
   },
   err => this.flag=true)
  }



}
