import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router,  } from '@angular/router';

import { Banner_test, logo_test } from '@app/modules/home/data';
import { ApiResponse } from '@app/@core/@data/API/api';
import { map } from 'rxjs';
import { Location } from '@angular/common';
import { CompaniesGuideService } from '../../../../@core/services/modules/companies-guide/companies-guide.service';
import { CompaniesHome, co_Search_Form_Data } from '@app/@core/interfaces/companies-guid/co-home-data';
import { CompaniesFilterList } from '@app/@core/interfaces/companies-guid/co-filter-list-hom,e';
import { JsonFormData } from '@app/@core/interfaces/_app/horizontal-search';
import { BannersLogoservice } from '@app/@core/services/Banners-logos.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-co-guide-home',
  templateUrl: './co-guide-home.component.html',
  styleUrls: ['./co-guide-home.component.scss']
})
export class CoGuideHomeComponent implements OnInit {

    @Output() complenght = new EventEmitter<string>();
    
  public loading: boolean = true
  public carousel_banner?: any = Banner_test  
  public carousel_logos:any = logo_test      
  public h_search_form: JsonFormData | any 
  public Companies_Home_Data?: CompaniesHome 
  private type?:string
  public typeAr?:string

  public filterData:{[key:string]:string}= {
    type:"",
    sort:"",
    search:"",
  }
  constructor(
    private companiesGuideService: CompaniesGuideService,
    private route: ActivatedRoute, 
    private router: Router,  
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private BannerLogoService:BannersLogoservice,
    private titleService:Title
) { }

  ngOnInit(): void {
    this.h_search_form = co_Search_Form_Data //set initial data to horizontal component 
    this.activatedRoute.data.pipe(
      map((data) => {
       return data
       })
    ).subscribe(res =>{//featch tha data from StockExhangeResolver 
       this.Companies_Home_Data = res['resolve']  as CompaniesHome
       this.BannerLogoService.setBanner(this.Companies_Home_Data.banners);
       this.BannerLogoService.setLogo(this.Companies_Home_Data.logos);
       this.loading = false;      
    })
    this.route.params.subscribe( params => {

      if(params['type'] == '0'){
        this.type = ''
      }else{
        this.type = params['type']
      }
      

      this.companiesGuideService.Filter_list(this.type+'').subscribe((res:ApiResponse<CompaniesFilterList>) => {
        this.typeAr= res.data?.sectors.find((i:any) =>i.selected ==1)?.name
        this.filterData['sector'] = res.data?.sectors.find((i:any) =>i.selected ==1)?.id+''
        this.type=this.filterData['sector']
        this.titleService.setTitle(' الدليل قسم '+this.typeAr);

        //override data to match the data format of horizontal components
        this.h_search_form.controls.find((i:any) => i.role === "sector").option = res.data?.sectors
        this.h_search_form.controls.find((i:any) => i.role === "sort").option =   res.data?.sort;
        this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id !== 0).selected=0
        this.h_search_form.controls.find((i:any) => i.role === "sort").option.unshift({"id": 0,"name": "اختر الترتيب","value": ''})

      }) 
    })

  }

  filter(value:any) {
    let flag=false;
    let sort='';
    this.route.params.subscribe( params => {
      // this.filterData['sector'] = params['type']
      switch ( value.type ) {
        case "sector":
          this.filterData['sector'] = value.id
          this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id == 0).selected=1
          flag=true
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
            // 
            break;
     }

     this.companiesGuideService.CompaniesHome(this.filterData['sector'], sort, this.filterData['search'] ).subscribe( res => {
        this.Companies_Home_Data = res  as CompaniesHome
        this.BannerLogoService.setBanner(this.Companies_Home_Data.banners);
        this.BannerLogoService.setLogo(this.Companies_Home_Data.logos);
        this.loading = false;
        // change url params without reloade with new state
        this.type = this.filterData['sector']
        this.h_search_form.controls.find((i:any) => i.role === "sector").option = this.Companies_Home_Data.sectors
        this.typeAr= this.Companies_Home_Data.sectors.find((i:any) =>i.selected ==1)?.name
        if(flag){
          this.titleService.setTitle(' الدليل قسم '+this.typeAr);
        }
        // console.log(this.Companies_Home_Data.sub_sections.length)
        this.location.go(`companies-guide/${this.type }`);
      })
    })
  }
  navigate(id: string): void
  {
   let len=this.Companies_Home_Data?.sub_sections?.find(i=>i.id == parseInt(id) )?.companies_count+'';
    
    this.complenght.emit(len);
    this.router.navigate([`companies-guide/${this.type}/companies/${this.type}/${id}`], { queryParams: { page: 0 } });
  }
}