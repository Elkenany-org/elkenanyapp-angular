import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,  } from '@angular/router';

import { Banner_test, logo_test } from '@app/modules/home/data';
import { ApiResponse } from '@app/@core/@data/API/api';
import { map } from 'rxjs';
import { Location } from '@angular/common';
import { CompaniesGuideService } from '../../../../@core/services/modules/companies-guide/companies-guide.service';
import { CompaniesHome, co_Search_Form_Data } from '@app/@core/interfaces/companies-guid/co-home-data';
import { CompaniesFilterList } from '@app/@core/interfaces/companies-guid/co-filter-list-hom,e';
import { JsonFormData } from '@app/@core/interfaces/_app/horizontal-search';
@Component({
  selector: 'app-co-guide-home',
  templateUrl: './co-guide-home.component.html',
  styleUrls: ['./co-guide-home.component.scss']
})
export class CoGuideHomeComponent implements OnInit {

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
    private location: Location) { }

  ngOnInit(): void {




    this.h_search_form = co_Search_Form_Data //set initial data to horizontal component 
    this.activatedRoute.data.pipe(
      map((data) => {
       return data
       })
    ).subscribe(res =>{//featch tha data from StockExhangeResolver 
       this.Companies_Home_Data = res['resolve']  as CompaniesHome
       this.carousel_banner.banner = res['resolve'].banners
       this.carousel_logos.banner = res['resolve'].logos

       this.loading = false;      
    })
    this.route.params.subscribe( params => {
      this.type = params['type']
      this.filterData['sector'] = params['type']

      this.companiesGuideService.Filter_list(params['type']).subscribe((res:ApiResponse<CompaniesFilterList>) => {
        this.typeAr= res.data?.sectors.find((i:any) =>i.selected ==1)?.name

        //override data to match the data format of horizontal components
        this.h_search_form.controls.find((i:any) => i.role === "sector").option = res.data?.sectors
        this.h_search_form.controls.find((i:any) => i.role === "sort").option =   res.data?.sort;
      }) 
    })    
  }

  filter(value:any) {
    let sort='0';
    this.route.params.subscribe( params => {
      // this.filterData['sector'] = params['type']
      switch ( value.type ) {
        case "sector":
          this.filterData['sector'] = value.name
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
        this.carousel_banner.banner = this.Companies_Home_Data .banners
        this.carousel_logos.banner = this.Companies_Home_Data .logos
        this.loading = false;
        // change url params without reloade with new state
        this.type = this.filterData['sector']
        this.h_search_form.controls.find((i:any) => i.role === "sector").option = this.Companies_Home_Data.sectors
        this.typeAr= this.Companies_Home_Data.sectors.find((i:any) =>i.selected ==1)?.name
        console.log(        this.Companies_Home_Data.sub_sections.length)
        this.location.go(`companies-guide/${this.type }`);
      })
    })
  }
  navigate(id: string): void
  {
    this.router.navigate([`companies-guide/${this.type}/companies/${this.type}/${id}`]);
  }
}