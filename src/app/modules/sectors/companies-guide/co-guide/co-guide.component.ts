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

  public loading: boolean = false
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
    private titleService : Title) { }

  ngOnInit(): void {

    this.h_search_form = co_Search_Form_Data //set initial data to horizontal component 
    this.activatedRoute.data.pipe(
      map((data) => {
       return data
       })
    ).subscribe(res =>{//featch tha data from StockExhangeResolver 
      // console.log(res['resolve'].data);
      
      this.page.current_page = res['resolve'].data.current_page
      this.page.last_page =  res['resolve'].data.last_page
       this.Companies = res['resolve'].data  as Companies
      //  this.carousel_banner.banner = res['resolve'].banners
      //  this.carousel_logos.banner = res['resolve'].logos
       this.BannerLogoService.setBanner(res['resolve'].data.banners);
       this.BannerLogoService.setLogo(res['resolve'].data.logos);
      //  console.log('???????');
      
      //  console.log(res['resolve'].banners);
       this.loading = false;    
       this.h_search_form.title=' شركات الدليل '
       this.titleService.setTitle(' شركات الدليل ');

      //  this.comLength=this.Companies.l     
      //  console.log(this.Companies.data);
    })





    this.route.params.subscribe( params => {
      this.type = params['type']
      this.id= params['id']
      // console.log(this.Sector[params['type']].toString());
      
      this.companiesGuideService.co_Filter_listV2(this.Sector[params['type']].toString(),'').subscribe((res:ApiResponse<FilterListCompanies>) => {
        this.typeAr= res.data?.sectors.find((i:any) =>i.selected ==1)?.name
        this.titleService.setTitle(' شركات الدليل قسم '+this.typeAr);

        //override data to match the data format of horizontal components
        this.h_search_form.controls.find((i:any) => i.role === "sector").option = res.data?.sectors
        this.h_search_form.controls.find((i:any) => i.role === "subsection").option = res.data?.sub_sections

        this.h_search_form.controls.find((i:any) => i.role === "cities").option =   res.data?.cities;
        this.h_search_form.controls.find((i:any) => i.role === "countries").option =   res.data?.countries;
        this.h_search_form.controls.find((i:any) => i.role === "sort").option =   res.data?.sort;

        // console.log(params);
        // console.log(this.h_search_form.controls.find((i:any) => i.role === "subsection").option.find((i:any) => i.id == params['id']));

        this.h_search_form.controls.find((i:any) => i.role === "subsection").option.find((i:any) => i.id == params['id']).selected=1
        this.h_search_form.controls.find((i:any) => i.role === "subsection").option.find((i:any) => i.id != params['id']).selected=0

        this.filterData["section_id"]= this.h_search_form.controls.find((i:any) => i.role === "sector").option.find((i:any) => i.type === params['type']).id

        this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id === 2).selected=1
        this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id !== 2).selected=0

      }) 
    })
    

    // this.filterData["page"] = this.page.last_page+''
    // this.filterData["sub_id"]= this.id +''
    // console.log(this.page.last_page);
    
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
      // else{
      //   this.comLength =(this.Companies?.data.length!)
      // }
      // console.log(this.comLength);
     })
   }

    //  this.len.complenght.subscribe(
    //   res=>{this.comLength=res}
    //  )
     


  }



  filter(option:any) {
    let sectorId: any 
    let sectorType 
    let sort='2'
    this.route.params.subscribe( params => {
      // console.log(params);
      

      if(!this.filterData["section_id"]) {
        this.filterData["section_id"]= this.h_search_form.controls.find((i:any) => i.role === "sector").option.find((i:any) => i.type === params['type']).id
      }    
      if(!this.filterData["sub_id"]) {
        this.filterData["sub_id"]= params['id']
      }
      // 
      // console.log(this.filterData);

      switch ( option.type ) {
        case "subsection":
          this.filterData["sub_id"] = option.id
          let url=`companies-guide/${params['type']}/companies/${params['type']}/${option.id}`
          this.location.replaceState(url);
          this.h_search_form.controls.find((i:any) => i.role === "subsection").option.find((i:any) => i.id === option.id).selected=1
          this.h_search_form.controls.find((i:any) => i.role === "subsection").option.find((i:any) => i.id !== option.id).selected=0

          // console.log('/////');

          // console.log(this.h_search_form.controls.find((i:any) => i.role === "subsection").option.find((i:any) => i.id === option.id));
          // console.log('/////');
          


            break;
        case "sector":
          this.filterData["section_id"] = option.id 
          this.router.navigate([`companies-guide/${option.name}`]);

          // sectorType = this.h_search_form.controls.find((i:any) => i.role === "sector") // error here 
          // .option.find((i:any) => i.id === this.filterData['sub_id']).type
          // sectorId = this.h_search_form.controls.find((i:any) => i.role === "sector") // error here 
          // .option.find((i:any) => i.id === this.filterData['sub_id']).id
          // this.location.go(`companies-guide/${sectorType}/companies/${sectorType}/${sectorId}`);
          // console.log(sectorType);
          
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
          // this.filterData["city_id"] = ''
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
     
    // sectorType = this.h_search_form.controls.find((i:any) => i.role === "sector") // error here 
    // .option.find((i:any) => i.id === this.filterData['sub_id']).type
    // sectorId = this.h_search_form.controls.find((i:any) => i.role === "sector") // error here 
    // .option.find((i:any) => i.id === this.filterData['sub_id']).id
  // if(option.type == 'sector') {
  //   this.router.navigate([`companies-guide/${option.name}`]);
  // }
  // else{




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
// console.log('============');

//          console.log(res.data);
         
    }) }
  // }
      this.companiesGuideService.Companiesv2(this.filterData).subscribe( res => {
        // this.typeAr= option.title
        this.page.current_page = res.data?.current_page!
        this.page.last_page =  res.data?.last_page!
        this.Companies = res.data  as Companies
        this.carousel_banner.banner = res.data?.banners  
        this.carousel_logos.banner = res.data?.logos
        this.BannerLogoService.setBanner(res.data?.banners!);
        this.BannerLogoService.setLogo(res.data?.logos!);
        this.loading = false;
        // this.comLength = this.Companies.data.length!
        // change url params without reloade with new statep
        // console.log(this.page.last_page);
        // console.log('last2');
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
          
          // console.log(this.comLength);
         })
         }
        })

//     console.log(this.page.last_page);
//     console.log('last');
    

// console.log(this.filterData);

        // this.location.go(`companies-guide/${sectorType}/companies/${sectorType}/${sectorId}`);
    })
  }
  
  navigate(id: string): void{
    this.router.navigate([`companies-guide/poultry/companies_details/${this.type}/${id}`]);
  }


  rate(body: { company_id: string; reat: string; }):void {
    this.companiesGuideService.rate(body).subscribe(res => {
    })
  }

  next_page(page:number):void{
    this.filterData["page"] = page+''
    this.filterData["sub_id"]= this.id +''
    this.filterData["section_id"] =this.h_search_form.controls.find((i:any) => i.role === "sector").option.find((i:any) => i.type ==this.type).id  
     this.companiesGuideService.Companiesv2(this.filterData).subscribe(res => {
      this.page.current_page = res.data?.current_page as number
      this.page.last_page = res.data?.last_page as number
      //  this.page.last_page =  res.data?.last_page  as number
      this.Companies = res.data  as Companies
      // this.comLength = this.Companies.data.length
      window.scroll(0,0);

      
     })
  }

}


