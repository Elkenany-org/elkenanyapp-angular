import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { BannersLogoservice } from '@app/@core/services/Banners-logos.service';
import { JsonFormData } from '@app/@shared/components/form/cva/cva.component';

import { FilterList } from '@app/@core/interfaces/_app/filter-list';
import { Banner, Logo } from '@app/@core/interfaces/_app/app-response';
import { MagazineService } from '../_core/services/magazine.service';
import {  MagazinesData, Magazine_Search_Form } from '@app/@core/interfaces/magazine/magazine';

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
    sort:"1",
    search:"",
    cities:'1',
  }
  public h_search_form: JsonFormData | any 

  constructor( private activatedRoute: ActivatedRoute,
               private magazine: MagazineService,         
               private BannerLogoService:BannersLogoservice,
               private router: Router,
  
    ) { }

  ngOnInit(): void {
    this.h_search_form = Magazine_Search_Form //set initial data to horizontal component 

    this.activatedRoute.params.subscribe(prm => {
      console.log(prm)
    })
    this.magazine.magazines("poultry",0,'','').subscribe(res => {
      this.magazines= res.data?.data
      this.BannerLogoService.setBanner(res.data?.banners as Banner[]);
      this.BannerLogoService.setLogo(res.data?.logos as Logo[]);
      this.loading = false;      

      console.log(this.magazines)


            this.magazine.filter_list('poultry',1).subscribe((res:ApiResponse<FilterList>) => {
        // override data to match the data format of horizontal components
        console.log(res)
        this.h_search_form.controls.find((i:any) => i.role === "sector").option = res.data?.sectors
        this.h_search_form.controls.find((i:any) => i.role === "sort").option =   res.data?.sort;
        this.h_search_form.controls.find((i:any) => i.role === "cities").option =   res.data?.cities;
        console.log(this.h_search_form)

      }) 


    })
    // this.activatedRoute.data.pipe(
    //   map((data) => {
    //    return data
    //    })
    // ).subscribe(res =>{//featch tha data from StockExhangeResolver 
    //   this.toster.stopLoading()
    //   console.log(res)
    //   this.News = res['resolve'].data.data  as News[]
    //   this.BannerLogoService.setBanner(res['resolve'].banners);
    //   this.BannerLogoService.setLogo(res['resolve'].logos);
    //   this.loading = false;      
    // })

    // this.route.params.subscribe( params => {
    //   this.type = params['type']

    //   this.news.filter_list(params['type']).subscribe((res:ApiResponse<FilterList>) => {
    //     // override data to match the data format of horizontal components
    //     console.log(res)
    //     this.h_search_form.controls.find((i:any) => i.role === "sector").option = res.data?.sectors
    //     this.h_search_form.controls.find((i:any) => i.role === "sort").option =   res.data?.sort;
    //     console.log(this.h_search_form)

    //   }) 
    // })   
    
    
  }

  filter(value:any) {
    console.log(value)

      switch ( value.type ) {
        case "sector":
          this.filterData['sector'] = value.name
          break;
        case "sort":
          this.filterData['sort'] = value.id 
          break;
        case "cities":
          this.filterData['cities'] = value.id 
          break;
        default: 
          break;
     }
     console.log(
      this.filterData['sector'],
     +this.filterData['sort'],
     +this.filterData['cities'])

     this.magazine.magazines(this.filterData['sector'],
                             +this.filterData['sort'],
                             this.filterData['cities'],'').subscribe(res => {
       this.magazines= res.data?.data
     })

  }
  navigate(id: string): void
  {
    this.router.navigate([`/magazine/details/${id}`]);
  }

}
