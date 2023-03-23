import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { BannersLogoservice } from '@app/@core/services/Banners-logos.service';
import { map } from 'rxjs';
// import { News, Search_Form_Data } from '../_core/data/News';
import { NewsService } from '../../../../@core/services/modules/news/news.service';
import { Location } from '@angular/common';
import { FilterList } from '@app/@core/interfaces/_app/filter-list';
import { Banner, Logo } from '@app/@core/interfaces/_app/app-response';
import {  News_Search_Form_Data } from '@app/@core/@data/app/news/news';
import { News } from '@app/@core/interfaces/news/news';
import { JsonFormData } from '@app/@core/interfaces/_app/horizontal-search';
import { Title ,Meta} from '@angular/platform-browser';
// import { SeoSocialShareService } from 'ngx-seo';
import { SeoSocialShareData } from '@app/@core/interfaces/seo/seo';
import { SeoSocialShareService } from 'ngx-seo';

@Component({
  selector: 'app-news-home',
  templateUrl: './news-home.component.html',
  styleUrls: ['./news-home.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class NewsHomeComponent implements OnInit {
  private flagFirsttime:boolean=false;

  public loading: boolean = false
  public News?:News[]
  private type?:string
  public page= {last_page: 0, current_page:0}


  public filterData:{[key:string]:string}= {
    type:"",
    sort:"",
    search:"",
    page:'1'
  }
  public h_search_form: JsonFormData | any 
  
  seoData: SeoSocialShareData = {
    title: ' الأخبار ',
    description: 'أخبار الكناني لتغطية أحدث الأخبار والأحداث اليومية ',
    url:'https://elkenany.com/#/news/1'
};
  constructor( private activatedRoute: ActivatedRoute,
               private BannerLogoService:BannersLogoservice,
               private route: ActivatedRoute, 
               private news: NewsService,
               private router: Router,
               private location: Location,
              private titleService:Title,
              private readonly seoSocialShareService: SeoSocialShareService
    ) { }

  ngOnInit(): void {
    this.seoSocialShareService.setData(this.seoData);

    

    
    // this.titleService.setTitle(' الأخبار ');

    this.h_search_form = News_Search_Form_Data //set initial data to horizontal component 


    this.activatedRoute.queryParamMap.subscribe((params) => {
      if(this.flagFirsttime){
        this.page.current_page = +params.get('page')!;
        this.news.all_news(this.type||'',+params.get('sort')!||1,this.filterData['search'], this.page.current_page).subscribe(res => {
          this.page.current_page = res.data?.current_page as number
           this.page.last_page =  res.data?.last_page  as number
           this.News = res.data?.data
        })
      }}
    );
 


    this.activatedRoute.data.pipe(
      map((data) => {
       return data
       })
    ).subscribe(res =>{//featch tha data from StockExhangeResolver 
      // console.log(res['resolve']);
      this.page.current_page = res['resolve'].data.current_page
      this.page.last_page =  res['resolve'].data.last_page
      this.News = res['resolve'].data.data  as News[]
      this.BannerLogoService.setBanner(res['resolve'].data.banners);
      this.BannerLogoService.setLogo(res['resolve'].data.logos);
      this.loading = false;     
      this.flagFirsttime=true
 
    })

    this.route.params.subscribe( params => {
      this.type = params['type']

      this.news.filter_list(params['type']).subscribe((res:ApiResponse<FilterList>) => {
        // override data to match the data format of horizontal components
        this.h_search_form.controls.find((i:any) => i.role === "sector").option = res.data?.sectors
        this.h_search_form.controls.find((i:any) => i.role === "sort").option =   res.data?.sort;
        this.type = this.h_search_form.controls.find((i:any) => i.role === "sector").option.find((i:any) => i.selected == 1).id
        this.location.go(`/news/${this.type }`,'sort=1&page=0');
      }) 
    })   
    
    
  }

  filter(value:any) {
    this.filterData['search']=''
    this.filterData['sector'] = this.type||'1'
    this.route.params.subscribe( params => {
      // this.filterData['sector'] = params['type']
      switch ( value.type ) {
        case "sector":
          this.filterData['sector'] = value.id
          break;
        case "sort":
          this.filterData['sort'] = value.id 
          this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id === value.id).selected=1
          this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id !== value.id).selected=0
          break;
          case "search":
            this.filterData['search'] = value.name 
            break;
        default: 
          break;
     }
    })
    this.news.all_news(this.filterData['sector'],+this.filterData['sort'],this.filterData['search'],1).subscribe(res => {
      // console.log(res)
      this.News= res.data?.data 
      this.page.current_page = res.data?.current_page as number
      this.page.last_page =  res.data?.last_page  as number
      this.BannerLogoService.setBanner(res.data?.banners as Banner[]);
      this.BannerLogoService.setLogo(res.data?.logos as Logo[]);
      this.h_search_form.controls.find((i:any) => i.role === "sector").option = res.data?.sections

      this.location.go(`/news/${ this.filterData['sector'] }`,`sort=${this.filterData['sort']}&page=1`);

      this.type=this.filterData['sector']

    })
  }
  navigate(id: string): void
  {
    this.router.navigate([`/news/${this.type}/${id}`]);
  }


  next_page(page:number):void{
    this.filterData["page"] = page+''
    this.router.navigate([`news/${this.type}`], { queryParams: { sort:this.filterData['sort'], page: page } });
           window.scroll(0,0);

    // this.news.all_news(this.type||'',+this.filterData['sort'],this.filterData['search'],+this.filterData['page']).subscribe(res => {
    //   this.page.current_page = res.data?.current_page as number
    //    this.page.last_page =  res.data?.last_page  as number
    //    this.News = res.data?.data
    //   //  console.log(this.page.last_page );
    //   //  console.log(res);


    // })


      
     
  }

}
