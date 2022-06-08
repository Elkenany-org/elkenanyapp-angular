import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,  } from '@angular/router';

import { Banner_test, logo_test } from '@app/modules/home/data';
import { ApiResponse } from '@app/@core/@data/API/api';
import { JsonFormData } from '@app/@shared/components/form/cva/cva.component';
import { map } from 'rxjs';


import { Location } from '@angular/common';
import { CompaniesGuideService } from '../../../../@core/services/modules/companies-guide/companies-guide.service';
import { Companies, co_Search_Form_Data, FilterListCompanies } from '@app/@core/interfaces/companies-guid/co-companies';
@Component({
  selector: 'app-co-guide',
  templateUrl: './co-guide.component.html',
  styleUrls: ['./co-guide.component.scss']
})
export class CoGuideComponent implements OnInit {

  public loading: boolean = true
  public carousel_banner?: any = Banner_test  
  public carousel_logos:any = logo_test      
  public h_search_form: JsonFormData | any 
  public Companies?: Companies ;
  public type?:string
  public id?:string
  public page= {last_page: 0, current_page:0}
  public typeAr?:string

  public Sector:{[key:string]:number} = {
    poultry: 1,
    animal: 2,
    farm: 3,
    fish: 4,
    horses: 5
   }

  public filterData:{[key:string]:string}= {
    section_id:"",
    sub_id:"",
    sort:"",
    country_id:"1",
    city_id:"",
    search: "",
    page:'1'
  }
  
  constructor(
    private companiesGuideService: CompaniesGuideService,
    private route: ActivatedRoute,
    private router: Router,   
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {

    this.h_search_form = co_Search_Form_Data //set initial data to horizontal component 
    this.activatedRoute.data.pipe(
      map((data) => {
       return data
       })
    ).subscribe(res =>{//featch tha data from StockExhangeResolver 
      console.log(res['resolve'].data);
      
      this.page.current_page = res['resolve'].data.current_page
      this.page.last_page =  res['resolve'].data.last_page
       this.Companies = res['resolve'].data  as Companies
       this.carousel_banner.banner = res['resolve'].banners
       this.carousel_logos.banner = res['resolve'].logos
       this.loading = false;    
       
    })
    this.route.params.subscribe( params => {
      this.type = params['type']
      this.id= params['id']
      this.companiesGuideService.co_Filter_listV2(this.Sector[params['type']].toString()).subscribe((res:ApiResponse<FilterListCompanies>) => {
        this.typeAr= res.data?.sectors.find((i:any) =>i.selected ==1)?.name

        //override data to match the data format of horizontal components
        this.h_search_form.controls.find((i:any) => i.role === "sector").option = res.data?.sectors
        this.h_search_form.controls.find((i:any) => i.role === "cities").option =   res.data?.cities;
        this.h_search_form.controls.find((i:any) => i.role === "countries").option =   res.data?.countries;
        this.h_search_form.controls.find((i:any) => i.role === "sort").option =   res.data?.sort;
        // this.h_search_form.controls.find((i:any) => i.role === "section").option =   res.data?.sub_sections;
      }) 
    })    

    // this.rate({company_id: "75", reat:"3"})
  }



  filter(option:any) {
    let sectorId: any 
    let sectorType 
    this.route.params.subscribe( params => {
      if(!this.filterData["sub_id"]) {
        this.filterData["sub_id"]= this.h_search_form.controls.find((i:any) => i.role === "sector").option.find((i:any) => i.type === params['type']).id
      }
      // 
      switch ( option.type ) {
        case "section":
          this.filterData["section_id"] = option.id
            break;
        case "sector":
          this.filterData["sub_id"] = option.id 
          break;
        case "sort":
          this.filterData["sort"] = option.id
            break;
        case "countries":
          this.filterData["country_id"] = option.id 
            break
        case "cities":
          this.filterData["city_id"] = option.id 
            break
        case "search":
            this.filterData["search"] = option.name
            break            
        default: 
            // 
            break;
     }
     
    sectorType = this.h_search_form.controls.find((i:any) => i.role === "sector") // error here 
    .option.find((i:any) => i.id === this.filterData['sub_id']).type
    sectorId = this.h_search_form.controls.find((i:any) => i.role === "sector") // error here 
    .option.find((i:any) => i.id === this.filterData['sub_id']).id
  if(option.type == 'sector') {
    this.router.navigate([`companies-guide/${option.name}`]);

  }
  else{
    this.companiesGuideService.co_Filter_listV2(
      this.filterData["sub_id"],
      this.filterData["country_id"] ,
      this.filterData["city_id"],
      +this.filterData["sort"]).subscribe((res:ApiResponse<FilterListCompanies>) => {
      //override data to match the data format of horizontal components

        this.h_search_form.controls.find((i:any) => i.role === "sector").option = res.data?.sectors
        this.h_search_form.controls.find((i:any) => i.role === "cities").option =   res.data?.cities;
        this.h_search_form.controls.find((i:any) => i.role === "countries").option =   res.data?.countries;
        this.h_search_form.controls.find((i:any) => i.role === "sort").option =   res.data?.sort;
        
        // this.h_search_form.controls.find((i:any) => i.role === "section").option =   res.data?.sub_sections;
    }) 
  }
      this.companiesGuideService.Companiesv2(this.filterData).subscribe( res => {
        this.typeAr= res.data?.sectors.find((i:any) =>i.selected ==1)?.name

        this.Companies = res.data  as Companies
        this.carousel_banner.banner = res.data?.banners  
        this.carousel_logos.banner = res.data?.logos
        this.loading = false;

        // change url params without reloade with new statep
    
        })
        this.location.go(`companies-guide/${sectorType}/companies/${sectorType}/${sectorId}`);
    })
  }
  
  navigate(id: string): void{
    this.router.navigate([`companies-guide/poultry/companies_details/poultry/${id}`]);
  }


  rate(body: { company_id: string; reat: string; }):void {
    this.companiesGuideService.rate(body).subscribe(res => {
    })
  }

  next_page(page:number):void{
    this.filterData["page"] = page+''
    this.filterData["sub_id"]= this.id +''
    this.filterData["section_id"] =this.h_search_form.controls.find((i:any) => i.role === "sector").option.find((i:any) => i.type ===this.type).id  
     this.companiesGuideService.Companiesv2(this.filterData).subscribe(res => {
      this.page.current_page = res.data?.current_page as number
      this.page.last_page = res.data?.last_page as number
      //  this.page.last_page =  res.data?.last_page  as number
      this.Companies = res.data  as Companies
      
     })
  }

}


