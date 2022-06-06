import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { BannersLogoservice } from '@app/@core/services/Banners-logos.service';
import { JsonFormData } from '@app/@shared/components/form/cva/cva.component';
import { map } from 'rxjs';
// import { News, Search_Form_Data } from '../_core/data/News';
import { NewsService } from '../_core/news.service';
import { Location } from '@angular/common';
import { FilterList } from '@app/@core/interfaces/_app/filter-list';
import { Banner, Logo } from '@app/@core/interfaces/_app/app-response';
import {  News_Search_Form_Data } from '@app/@core/@data/app/news/news';
import { News } from '@app/@core/interfaces/news/news';

@Component({
  selector: 'app-news-home',
  templateUrl: './news-home.component.html',
  styleUrls: ['./news-home.component.scss']
})
export class NewsHomeComponent implements OnInit {

  public loading: boolean = false
  public News?:News[]
  private type?:string
  public filterData:{[key:string]:string}= {
    type:"",
    sort:"",
    search:"",
  }
  public h_search_form: JsonFormData | any 

  constructor( private activatedRoute: ActivatedRoute,
               private BannerLogoService:BannersLogoservice,
               private route: ActivatedRoute, 
               private news: NewsService,
               private router: Router,
               private location: Location,
  
    ) { }

  ngOnInit(): void {
    this.h_search_form = News_Search_Form_Data //set initial data to horizontal component 

    this.activatedRoute.data.pipe(
      map((data) => {
       return data
       })
    ).subscribe(res =>{//featch tha data from StockExhangeResolver 
      console.log(res)
      this.News = res['resolve'].data.data  as News[]
      this.BannerLogoService.setBanner(res['resolve'].banners);
      this.BannerLogoService.setLogo(res['resolve'].logos);
      this.loading = false;      
    })

    this.route.params.subscribe( params => {
      this.type = params['type']

      this.news.filter_list(params['type']).subscribe((res:ApiResponse<FilterList>) => {
        // override data to match the data format of horizontal components
        console.log(res)
        this.h_search_form.controls.find((i:any) => i.role === "sector").option = res.data?.sectors
        this.h_search_form.controls.find((i:any) => i.role === "sort").option =   res.data?.sort;
        console.log(this.h_search_form)

      }) 
    })   
    
    
  }

  filter(value:any) {

    this.route.params.subscribe( params => {
      this.filterData['sector'] = params['type']
      switch ( value.type ) {
        case "sector":
          this.filterData['sector'] = value.name
          break;
        case "sort":
          this.filterData['sort'] = value.id 
          break;
        default: 
          break;
     }
    })
    this.news.all_news(this.filterData['sector'],+this.filterData['sort']).subscribe(res => {
      console.log(res)
      this.News= res.data?.data 
      this.BannerLogoService.setBanner(res.data?.banners as Banner[]);
      this.BannerLogoService.setLogo(res.data?.logos as Logo[]);
      this.h_search_form.controls.find((i:any) => i.role === "sector").option = res.data?.sections
      this.location.go(`news/${ this.filterData['sector'] }`);


    })
  }
  navigate(id: string): void
  {
    this.router.navigate([`/news/${this.type}/${id}`]);
  }

}
