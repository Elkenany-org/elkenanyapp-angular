import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router,  } from '@angular/router';

import { Banner_test, logo_test } from '@app/modules/home/data';
import { ApiResponse } from '@app/@core/@data/API/api';
import { map } from 'rxjs';


import { Location } from '@angular/common';
import { CompaniesGuideService } from '../../../../@core/services/modules/companies-guide/companies-guide.service';
import { Companies, co_Search_Form_Data, FilterListCompanies } from '@app/@core/interfaces/companies-guid/co-companies';
import { JsonFormData } from '@app/@core/interfaces/_app/horizontal-search';
import { BannersLogoservice } from '@app/@core/services/Banners-logos.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-co-guide',
  templateUrl: './co-guide.component.html',
  styleUrls: ['./co-guide.component.scss'],
  encapsulation:ViewEncapsulation.None

})
export class CoGuideComponent implements OnInit {
  private flagFirsttime:boolean=false;

  public loading: boolean = false
  public carousel_banner?: any = Banner_test  
  public carousel_logos:any = logo_test      
  public h_search_form: JsonFormData | any 
  public Companies?: Companies ;
  public type?:string
  public id?:string
  public page= {last_page: 0, current_page:0}
  public sub= {current_sub:1}

  public typeAr?:string

  public Sector:{[key:string]:number} = {
    poultry: 1,
    animal: 2,
    farm: 3,
    fish: 4,
    horses: 5,
    industrial:6
   }

  public filterData:{[key:string]:string}= {
    section_id:"",
    sub_id:"",
    sort:"2",
    country_id:"",
    city_id:"",
    search: "",
    page:''
  }
  comLength=0;
  constructor(
    private companiesGuideService: CompaniesGuideService,
    private route: ActivatedRoute,
    private router: Router,   
    private activatedRoute: ActivatedRoute,
    private location: Location,

    private BannerLogoService:BannersLogoservice,
    private titleService : Title) { 
 
    }

  ngOnInit(): void {

    this.h_search_form = co_Search_Form_Data //set initial data to horizontal component 
    this.activatedRoute.data.pipe(
      map((data) => {
       return data
       })
    ).subscribe(res =>{//featch tha data from StockExhangeResolver 

      this.page.current_page = res['resolve'].data.current_page
      this.page.last_page =  res['resolve'].data.last_page
       this.Companies = res['resolve'].data  as Companies

       this.BannerLogoService.setBanner(res['resolve'].data.banners);
       this.BannerLogoService.setLogo(res['resolve'].data.logos);

       this.loading = false;    
       this.flagFirsttime=true
       this.h_search_form.title=' شركات الدليل '
       this.titleService.setTitle(' شركات الدليل ');

    })


    this.activatedRoute.queryParamMap.subscribe((params) => {
          this.id= params.get('sub') || ''

    })


    this.route.params.subscribe( params => {      
      this.type = params['type']
      // this.sub.current_sub=params['id']
      this.companiesGuideService.co_Filter_listV2(params['type'],'').subscribe((res:ApiResponse<FilterListCompanies>) => {

        this.typeAr= res.data?.sub_sections.find((i:any) =>i.id ==this.id)?.name
        this.titleService.setTitle(' قسم '+this.typeAr);

        //override data to match the data format of horizontal components
        this.h_search_form.controls.find((i:any) => i.role === "sector").option = res.data?.sectors
        this.h_search_form.controls.find((i:any) => i.role === "subsection").option = res.data?.sub_sections

        this.h_search_form.controls.find((i:any) => i.role === "cities").option =   res.data?.cities;
        this.h_search_form.controls.find((i:any) => i.role === "countries").option =   res.data?.countries;
        this.h_search_form.controls.find((i:any) => i.role === "sort").option =   res.data?.sort;


        this.h_search_form.controls.find((i:any) => i.role === "subsection").option.find((i:any) => i.id == this.id).selected=1
        this.h_search_form.controls.find((i:any) => i.role === "subsection").option.find((i:any) => i.id != this.id).selected=0

        this.filterData["section_id"]= params['type']
        this.filterData["sub_id"]= this.id+''

        this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id === 2).selected=1
        this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id !== 2).selected=0

      }) 
    })
    

    
 if(this.page.last_page > 1){
    this.companiesGuideService.Companiesv2({
      section_id:this.filterData["section_id"],
      sub_id:this.id,
      sort:"",
      country_id:"",
      city_id:"",
      search: "",
      page:this.page.last_page+''
    }).subscribe(res => {
      // this.comLength = res.data?.data.length!
        this.comLength = (res.data?.data.length!)

     })
   }

   window.addEventListener('popstate', this.onBackButtonEvent);


  }

  ngOnDestroy() {
    window.removeEventListener('popstate', this.onBackButtonEvent);

  }

  onBackButtonEvent = (event: any) => {
    const page = this.getPageNumberFromUrl();
    const sub = this.getSubIdFromUrl();
    if (page !== this.page.current_page || sub !== +this.filterData["sub_id"] ) {
      

      this.page.current_page = page;
      this.filterData["page"] = page+''
      this.filterData["sub_id"] = sub+''

      this.companiesGuideService.Companiesv2(this.filterData).subscribe(res => {  

        this.page.current_page = res.data?.current_page as number
        this.page.last_page = res.data?.last_page as number
        this.Companies = res.data  as Companies
        if(page>1){
          this.Companies.compsort = [];
        }

        this.setSelectedSubSection(sub)

        this.typeAr= this.h_search_form.controls.find((i:any) => i.role === "subsection").option.find((i:any) => i.id === sub).name
        this.titleService.setTitle(' قسم '+this.typeAr);
        window.scroll(0,0);
       })
     }
    

  }


  filter(option:any) {
    let sectorId: any 
    let sectorType 
    let sort='2'
    this.filterData["page"] = '1'

    this.route.params.subscribe( params => {

      if(!this.filterData["section_id"]) {
        this.filterData["section_id"]= params['type']
      }    
      if(!this.filterData["sub_id"]) {
        this.filterData["sub_id"]= params['id']
      }
      // 
      // console.log(this.filterData);

      switch ( option.type ) {
        case "subsection":
          this.filterData["sub_id"] = option.id
          this.location.go(`/companies-guide/${this.type}/companies/${this.type}`,`page=${this.filterData['page']}&sub=${this.filterData["sub_id"]}`);

          this.setSelectedSubSection(option.id)
          this.typeAr= this.h_search_form.controls.find((i:any) => i.role === "subsection").option.find((i:any) => i.id === option.id).name
          this.titleService.setTitle(' قسم '+this.typeAr);

            break;
        case "sector":
          this.filterData["section_id"] = option.id 
          this.router.navigate([`companies-guide/${option.id}`]);

          break;
        case "sort":
          this.filterData["sort"] = option.id
          this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id === option.id).selected=1
          this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id !== option.id).selected=0
          sort = this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id === option.id).value
          // console.log(option.id);
          
          if(option.id=='1'){
            sort='0'
          }
          else if(option.id=='2'){
            sort='2'
          }
          this.filterData["sort"]=sort
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

    if(option.type== 'countries'){
    this.companiesGuideService.co_Filter_listV2(
      this.filterData["section_id"],
      this.filterData["country_id"]).subscribe((res:ApiResponse<FilterListCompanies>) => {
      //override data to match the data format of horizontal components

        this.h_search_form.controls.find((i:any) => i.role === "sector").option = res.data?.sectors
        this.h_search_form.controls.find((i:any) => i.role === "cities").option =   res.data?.cities;
        this.h_search_form.controls.find((i:any) => i.role === "countries").option =   res.data?.countries;
        this.h_search_form.controls.find((i:any) => i.role === "sort").option =   res.data?.sort;
        this.h_search_form.controls.find((i:any) => i.role === "subsection").option =   res.data?.sub_sections;

         
    }) }
  // }
    if(option.type != 'sector'){
      
      this.companiesGuideService.Companiesv2(this.filterData).subscribe( res => {
        // this.typeAr= option.title
        this.page.current_page = res.data?.current_page!
        this.page.last_page =  res.data?.last_page!

        this.Companies = res.data  as Companies
        if(option.type=="search" && this.filterData["search"]!="" || option.type=="countries" || option.type=="cities" ){
          this.Companies.compsort = [];
        }
        this.BannerLogoService.setBanner(res.data?.banners!);
        this.BannerLogoService.setLogo(res.data?.logos!);
        this.loading = false;

       if(this.page.last_page > 1){

        this.companiesGuideService.Companiesv2({
          section_id:this.filterData["section_id"],
          sub_id:this.filterData["sub_id"],
          sort:this.filterData["sort"],
          country_id:this.filterData["country_id"],
          city_id:this.filterData["city_id"],
          search: this.filterData["search"],
          page:this.page.last_page+''
        }).subscribe(res => {
            this.comLength =(res.data?.data.length!)
          
         })
         }
        })
        }
    })
  }
  
  navigate(id: string): void{
    this.router.navigate([`companies-guide/${this.type}/companies_details/${this.type}/${id}`]);
  }


  rate(body: { company_id: string; reat: string; }):void {
    this.companiesGuideService.rate(body).subscribe(res => {
    })
  }

  next_page(page:number):void{
    this.filterData["page"] = page+''
    // this.filterData["sub_id"]= this.id +''
    this.filterData["section_id"] = this.type+''
     this.companiesGuideService.Companiesv2(this.filterData).subscribe(res => {
      this.page.current_page = res.data?.current_page as number
      this.page.last_page = res.data?.last_page as number
      this.Companies = res.data  as Companies
      if(page>1){
        this.Companies.compsort = [];
      }
      window.scroll(0,0);
     })

     this.location.go(`/companies-guide/${this.type}/companies/${this.type}`,`page=${page}&sub=${this.filterData["sub_id"]}`);

  }


  getPageNumberFromUrl() {
    const page = this.location.path().match(/page=(\d+)/);

    return page ? +page[1] : 1;
  }

  getSubIdFromUrl() {
    const sub = this.location.path().match(/sub=(\d+)/);

    return sub ? +sub[1] : 1;
  }

  setSelectedSubSection(id : any){
    for (let option of this.h_search_form.controls.find((i:any) => i.role === "subsection").option) {
      option.selected = 0;
  }
  this.h_search_form.controls.find((i:any) => i.role === "subsection").option.find((i:any) => i.id === id).selected=1
  this.h_search_form.controls.find((i:any) => i.role === "subsection").option.find((i:any) => i.id !== id).selected=0
  }

}
