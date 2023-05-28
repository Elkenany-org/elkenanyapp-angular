import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { employment_Search_Form_Data } from '@app/@core/interfaces/employment/employment-home-data';
import { MarktData } from '@app/@core/interfaces/market/home';
import { JsonFormData } from '@app/@core/interfaces/_app/horizontal-search';
import { EmploymentService } from '@app/@core/services/modules/employment/employment.service';
import { map } from 'rxjs';
import { Location } from '@angular/common';
import { JobsData } from '@app/@core/interfaces/employment/home';
import { BannersLogoservice } from '@app/@core/services/Banners-logos.service';

@Component({
  selector: 'app-employment-home',
  templateUrl: './employment-home.component.html',
  styleUrls: ['./employment-home.component.scss']
})
export class EmploymentHomeComponent implements OnInit {

  public loading: boolean = true

  public h_search_form?: JsonFormData  |any // nay be will not work 
  public Jobs_Data?: JobsData []
  public type!:string
  // public page= {last_page: 0, current_page:0}

  public filterData:{[key:string]:string}= {
    type:"",
    sort:"",
    search:"",
    page:'',
    category:""
  }
  public page= {last_page: 0, current_page:0}

  constructor(
    private emplymentService: EmploymentService,
    private route: ActivatedRoute, 
    private router: Router,  
    private activatedRoute: ActivatedRoute,
    private titleService:Title,
    private BannerLogoService:BannersLogoservice,
  ) { }

  ngOnInit(): void {
    this.h_search_form = employment_Search_Form_Data //set initial data to horizontal component 
    this.titleService.setTitle(' الوظائف ');
    this.route.params.subscribe(params => {
      this.emplymentService.Filter_list().subscribe( res => {

        this.h_search_form.controls.find((i:any) => i.role === "category").option = res.data?.categories
        this.h_search_form.controls.find((i:any) => i.role === "sort").option =   res.data?.sort;
        this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id !== 1).selected=1
        this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id === 1).selected=0
        this.h_search_form.controls.find((i:any) => i.role === "category").option.find((i:any) => i.id === 1).selected=1
        this.h_search_form.controls.find((i:any) => i.role === "category").option.find((i:any) => i.id !== 1).selected=0
      })
      
      this.activatedRoute.data.pipe(
        map((data) => {
          return data['resolve'].data
        })
      ).subscribe(res => {  
        this.Jobs_Data =res.jobs
        this.page.current_page = res.current_page
        this.page.last_page =  res.last_page
        this.BannerLogoService.setBanner(res.banners);
        this.loading = false;

      })

    })


  }

  filter(value:any) {
    this.route.params.subscribe( params => {
      switch ( value.type ) {
        case "category":
              this.filterData['category'] = value.id
              this.h_search_form.controls.find((i:any) => i.role === "category").option.find((i:any) => i.id === value.id).selected=1
              this.h_search_form.controls.find((i:any) => i.role === "category").option.find((i:any) => i.id !== value.id).selected=0
            break;
        case "sort":
          if(value.id == 0){
            this.filterData['sort']=''
          }else{
              this.filterData['sort'] = value.id 
          }
          this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id === value.id).selected=1
          this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id !== value.id).selected=0
          break;
        case "search":
            this.filterData['search'] = value.name
            // console.log('date'+value.name);    
        
          break;
        default: 
            // 
            break;
     }

    })

 
    this.emplymentService.AllJobs(this.filterData['sort'],this.filterData['search'], this.filterData['category'],'').subscribe(res => {
      this.page.current_page = res.data?.current_page as number
      this.page.last_page = res.data?.last_page as number
      this.Jobs_Data =res.data?.jobs 
    })

  }

  navigate(id: string): void
  {
    // console.log(id)
    this.router.navigate([`/الوظائف/job-details/${id}`]);
    
  }

  next_page(page:number):void{
    this.filterData["page"] = page+''
     this.emplymentService.AllJobs(this.filterData['sort'],this.filterData['search'],this.filterData['category'],this.filterData["page"]).subscribe(res => {
      this.page.current_page = res.data?.current_page as number
      this.page.last_page = res.data?.last_page as number
      this.Jobs_Data =res.data?.jobs 
    })
  }

}
