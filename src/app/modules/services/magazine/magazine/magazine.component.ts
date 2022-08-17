import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { BannersLogoservice } from '@app/@core/services/Banners-logos.service';

import { FilterList } from '@app/@core/interfaces/_app/filter-list';
import { Banner, Logo } from '@app/@core/interfaces/_app/app-response';
import { MagazineService } from '../../../../@core/services/modules/magazine/magazine.service';
import {  MagazinesData, Magazine_Search_Form } from '@app/@core/interfaces/magazine/magazine';
import { JsonFormData } from '@app/@core/interfaces/_app/horizontal-search';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-magazine',
  templateUrl: './magazine.component.html',
  styleUrls: ['./magazine.component.scss']
})
export class MagazineComponent implements OnInit {
  public loading: boolean = false
  public magazines?:MagazinesData[]
  private type?:string
  public filterData:{[key:string]:string}= {
    type:"poultry",
    sort:"2",
    search:"",
    countries:'',
    cities:'',
    page:'1'
  }
  public page= {last_page: 0, current_page:0}

  typeAr='';
  public h_search_form: JsonFormData | any 

  comLength=0;

  constructor( private activatedRoute: ActivatedRoute,
               private magazine: MagazineService,         
               private BannerLogoService:BannersLogoservice,
               private router: Router,private titleService:Title
  
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle('الدلائل و المجلات');

    this.h_search_form = Magazine_Search_Form //set initial data to horizontal component 
    this.filterData['sector'] = 'poultry'

    this.typeAr='الداجني'
    this.activatedRoute.data.subscribe(data => {
      this.page.current_page = data['resolve'].data.current_page
      this.page.last_page =  data['resolve'].data.last_page
      this.magazines= data['resolve'].data?.data
      this.BannerLogoService.setBanner(data['resolve'].data?.banners as Banner[]);
      this.BannerLogoService.setLogo(data['resolve'].data?.logos as Logo[]);
      this.loading = false;   
      this.magazine.filter_list('poultry', 0).subscribe((res:ApiResponse<FilterList>) => {
        // override data to match the data format of horizontal components
        this.h_search_form.controls.find((i:any) => i.role === "sector").option = res.data?.sectors
        this.h_search_form.controls.find((i:any) => i.role === "sort").option =   res.data?.sort;
        this.h_search_form.controls.find((i:any) => i.role === "countries").option =   res.data?.countries;

        this.h_search_form.controls.find((i:any) => i.role === "cities").option =   res.data?.cities;
        this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id === 2).selected=1
        this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id !== 2).selected=0

      }) 
    // console.log(data['resolve'].data);

    })

    if(this.page.last_page > 1){
      this.magazine.magazines(this.filterData['sector'],2,'','','',this.page.last_page+''
      ).subscribe(res => {
        // this.comLength = res.data?.data.length!
          this.comLength = (res.data?.data.length!)
        // else{
        //   this.comLength =(this.Companies?.data.length!)
        // }
        // console.log(this.comLength);
       })
     }

    
  }

  filter(value:any) {
    // console.log(value)
    // this.filterData['sector'] = 'poultry'
    this.filterData['sort'] = '2'
    this.filterData['cities'] = ''
    // this.filterData['countries']=''
    this.filterData['search']=''
    let sort='2'
    // this.h_search_form.controls.find((i:any) => i.role === "sort").option[0].selected=1

      switch ( value.type ) {
        case "sector":
          this.filterData['sector'] = value.name
          this.typeAr=value.title
          this.magazine.filter_list(this.filterData['sector'], 0).subscribe((res:ApiResponse<FilterList>) => {
            // override data to match the data format of horizontal components
            this.h_search_form.controls.find((i:any) => i.role === "sector").option = res.data?.sectors
            this.h_search_form.controls.find((i:any) => i.role === "countries").option =   res.data?.countries;
            this.h_search_form.controls.find((i:any) => i.role === "cities").option =   res.data?.cities;
          }) 
          // console.log(this.filterData['countries']);
          // console.log(this.filterData['cities']);

          break;
        case "sort":
          this.filterData['sort'] = value.id 
          this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id === value.id).selected=1
          this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id !== value.id).selected=0
          sort = this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id === value.id).value          
          if(value.id=='1'){
            sort='0'
          }
          else if(value.id=='2'){
            sort='2'
          }
          this.filterData["sort"]=sort
            break;
        case "countries":
          if(value.id == 0){
            this.filterData['countries'] = '0'
          }else{
              this.filterData['countries'] = value.id 
              this.filterData['cities']='0'
          }
            // this.filterData['countries'] = value.id 
            this.magazine.filter_list(this.filterData['sector'], +this.filterData['countries']).subscribe((res:ApiResponse<FilterList>) => {
              // override data to match the data format of horizontal components
              this.h_search_form.controls.find((i:any) => i.role === "sector").option = res.data?.sectors
              this.h_search_form.controls.find((i:any) => i.role === "countries").option =   res.data?.countries;
              this.h_search_form.controls.find((i:any) => i.role === "cities").option =   res.data?.cities;
            }) 
            // console.log(this.filterData['countries']);

              break;
        case "cities":
          if(value.id == 0){
            this.filterData['cities'] = '0'
          }else{
            this.filterData['cities'] = value.id 
          }
              // this.filterData['cities'] = value.id 
          
        //  console.log(this.filterData['countries']);
        //  this.filterData['countries']=''

          break;
          case "search":
            this.filterData['search'] = value.name 
            break;
        default: 
          break;
     }

     
     this.magazine.magazines(this.filterData['sector'],
                             +this.filterData['sort'],this.filterData['countries'],
                             this.filterData['cities'],this.filterData['search'],this.filterData["page"]).subscribe(res => {
                              this.page.current_page = res.data?.current_page!
                              this.page.last_page =  res.data?.last_page!
       this.magazines= res.data?.data
            // console.log(this.page.last_page);
            if(this.page.last_page > 1){
              this.magazine.magazines(this.filterData['sector'],0,'','','',this.page.last_page+''
              ).subscribe(res => {
                  this.comLength = (res.data?.data.length!)
                // console.log(this.comLength);
              })
            }
     })

     



  }


  navigate(id: string): void
  {
    this.router.navigate([`magazine/details/${id}`]);
  }

  next_page(page:number):void{
    this.filterData["page"] = page+''

    this.magazine.magazines(this.filterData['sector'],
    +this.filterData['sort'],this.filterData['countries'],
    this.filterData['cities'],this.filterData['search'],this.filterData["page"]).subscribe(res => {
    this.magazines= res.data?.data

})
// console.log(this.magazines);

window.scroll(0,0);

  }


}
