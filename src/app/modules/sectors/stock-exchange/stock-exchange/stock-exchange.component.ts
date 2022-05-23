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
form!: FormGroup;
form2!: FormGroup;
ordersData = [
  { id: 100, name: 'order 1' },
  { id: 200, name: 'order 2' },
  { id: 300, name: 'order 3' },
  { id: 400, name: 'order 4' }
];


companiesList?:CompaniesItems[] =[]
/////////////////////////////////

  public feeds?: FodderCategory [];
  public companies?:CompaniesItems [];

  temp: any
  company= ''
  type_stock:string =''
  open:boolean= false
  collapse:number= 0


  

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
    private formBuilder: FormBuilder//////////
   ) {



    }

    

  ngOnInit(): void {


        ////////////////////////
        this.form = this.formBuilder.group({
          orders: new FormArray([])
        });

        this.form2 = this.formBuilder.group({
          orders: new FormArray([])
        });
    
        this.addCheckboxes();
        //////////////////////

        
    this.h_search_form = Stock_Search_Form_Data
    this.route.params.subscribe((prm:Params) => {
      // console.log(prm)
      // this.stockExchange.LocalStockandFodderSub(prm['id'],prm['type_stock'],'').subscribe(res => {
      //   this.toster.stopLoading()
      //   console.log(res);
      //   this.stock_Ex_Data = res.data  
      //   this.BannerLogoService.setBanner(res.data?.banners as Banner[]);
      //   this.BannerLogoService.setLogo(res.data?.logos as Logo[]);   
        
      //   this.stockExchange.FilterListItemSub(prm['type'],prm['type_stock'],prm['id']).subscribe(res => {
      //     console.log(res);
      //     this.h_search_form.controls.find((i:any) => i.role ==='sector').option = res.data?.sections
      //     this.h_search_form.controls.find((i:any) => i.role ==='stock').option = res.data?.fodder_sub_sections
          
      //   })
      // })


      if(prm['type_stock'] === 'fodder') {
        console.log('fodder')



       this.stockExchange.fodder(prm['id'],'').subscribe( res => {

          this.BannerLogoService.setBanner(res.data?.banners as Banner[]);
          this.BannerLogoService.setLogo(res.data?.logos as Logo[]);
          this.stock_Ex_Data = res.data  
          console.log(res.data  );
          
          this.search_Filter( prm['id'], prm['type'], prm['type_stock'])

          this.stockExchange.feeds_items(prm['id']).subscribe( res => {
            console.log(res);
            
            this.type_stock = prm['type_stock']
            this.feeds = res.data?.fodder_categories.concat(res.data.fodder_list) as FodderCategory[]
            this.loading = false;   
          })

          this.stockExchange.companies_items(prm['id']).subscribe( res => {
            console.log(res.data);
            
            this.companies= res.data
            this.addCheckboxes2()
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
      // console.log(res.data)
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
    console.log( value.type)



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

  get ordersFormArray() {
    return this.form.controls['orders'] as FormArray;
  }

  get ordersFormArray2() {
    return this.form2.controls['orders'] as FormArray;
  }


  private addCheckboxes() {
    this.ordersData.forEach(() => this.ordersFormArray.push(new FormControl(false)));
  }

  private addCheckboxes2() {
    // this.companies?.forEach(() => this.ordersFormArray2.push(new FormControl(false)))
    this.companiesList = this.companies 
    this.companiesList?.forEach(() => this.ordersFormArray2.push(new FormControl(false)))
  }




  submit() {
    const selectedOrderIds = this.form.value.orders
      .map((checked:any, i:any) => checked ? this.ordersData[i].id : null)
      .filter((v:any) => v !== null);
    console.log(selectedOrderIds);
  }


  submit2() {
    const selectedOrderIds = this.form2.value.orders
      .map((checked:any, i:any) => checked ? this.companies![i].id : null)
      .filter((v:any) => v !== null);
    console.log(selectedOrderIds);
  }


  filter2(v:any) {
    console.log(v);
    
      let temp:any = []
  //  this.form2.value.orders.map((checked:any, i:any) => console.log( i))

  // .find(i => i.name.includes(v) ))
      this.ordersFormArray2.controls=[]

      this.companies?.forEach(i =>  i.name.includes(v)?temp.push(i):console.log(false))
      this.companiesList=temp

      this.companiesList?.forEach(() => this.ordersFormArray2.push(new FormControl(false)))

      this.companiesList?.length ==0?this.companiesList=this.companies: this.companiesList
      console.log(this.companiesList);
      
    
  }

  //////////////////

}
