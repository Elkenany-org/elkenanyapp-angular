import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { News_Search_Form_Data, Tenders_Search_Form_Data } from '@app/@core/@data/app/news/news';
import { News } from '@app/@core/interfaces/news/news';
import { Banner, FilterList, Logo } from '@app/@core/interfaces/_app/app-response';
import { JsonFormData } from '@app/@core/interfaces/_app/horizontal-search';
import { BannersLogoservice } from '@app/@core/services/Banners-logos.service';
import { TendersService } from '@app/@core/services/modules/tenders/tenders.service';
import { map } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tenders',
  templateUrl: './tenders.component.html',
  styleUrls: ['./tenders.component.scss']
})
export class TendersComponent implements OnInit {

  private flagFirsttime:boolean=false;
  public loading: boolean = false
  public News?:News[]
  private type?:string
  public page= {last_page: 0, current_page:0}
  private section_id?:string
  public filterData:{[key:string]:string}= {
    type:"",
    sort:"",
    search:"",
    page:'1'
  }
  public h_search_form: JsonFormData | any 

  constructor( private Activatedroute: ActivatedRoute,
               private BannerLogoService:BannersLogoservice,
               private route: ActivatedRoute, 
               private TendersNews: TendersService,
               private location: Location,
               private router: Router,
              private titleService:Title
    ) { }

    ngOnInit(): void {
      this.titleService.setTitle(' المناقصات ');
  
      this.h_search_form = Tenders_Search_Form_Data //set initial data to horizontal component 
  

        this.Activatedroute.queryParamMap.subscribe((params) => {
        if(this.flagFirsttime){
          this.page.current_page = +params.get('page')!;
          this.TendersNews.all_news(this.section_id||'',params.get('sort')||'',this.filterData['search'],this.page.current_page+'').subscribe(res => {
            this.page.current_page = res.data?.current_page as number
             this.page.last_page =  res.data?.last_page  as number
             this.News = res.data?.data
          })
        }}
      );

      this.Activatedroute.data.pipe(
        map((data) => {
         return data
         })
      ).subscribe(res =>{//featch tha data from StockExhangeResolver 
        this.page.current_page = res['resolve'].data.current_page
        this.page.last_page =  res['resolve'].data.last_page
        this.News = res['resolve'].data.data  as News[]
        this.BannerLogoService.setBanner(res['resolve'].data.banners);
        this.BannerLogoService.setLogo(res['resolve'].data.logos);
        this.loading = false;     
        this.flagFirsttime=true
      })
      


      this.route.params.subscribe( params => {  
        this.section_id=params['id']
        this.TendersNews.filter_list(params['id']).subscribe(
          (res) => {
          this.h_search_form.controls.find((i:any) => i.role === "sector").option = res.data?.sections
          this.h_search_form.controls.find((i:any) => i.role === "sort").option =   res.data?.sort;
          this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id !== 2).selected=0
          this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id === 2).selected=1
        }) 
      })   
      
      
    }

    filter(value:any) {
      this.filterData['search']=''
      this.filterData['sector'] = this.section_id!
      this.route.params.subscribe( params => {
        switch ( value.type ) {
          case "sector":
            this.filterData['sector'] = value.id
            break;
          case "sort":
            if(value.id == 2){
              this.filterData['sort'] = ''
            }else{
              this.filterData['sort'] = value.id 
            }

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
      
      this.TendersNews.all_news(this.filterData['sector'],this.filterData['sort'],this.filterData['search'],'1').subscribe(res => {
        this.News= res.data?.data 
        this.page.current_page = res.data?.current_page as number
        this.page.last_page =  res.data?.last_page  as number
        this.BannerLogoService.setBanner(res.data?.banners as Banner[]);
        this.BannerLogoService.setLogo(res.data?.logos as Logo[]);
        this.h_search_form.controls.find((i:any) => i.role === "sector").option = res.data?.sections
  
        this.router.navigate([`tenders/${ this.filterData['sector'] }`], { queryParams: { sort:this.filterData['sort'] , page: 1 } });

        // this.location.go(`tenders/${ this.filterData['sector'] }`);
        this.section_id=this.filterData['sector']

  
      })
    }
    navigate(id: string): void
    {
      this.router.navigate([`tenders/details/${id}`]);
    }
  
  
    next_page(page:number):void{
      this.router.navigate([`tenders/${this.section_id}`], { queryParams: { sort:this.filterData['sort'] , page: page } });
      window.scroll(0,0);

      // this.filterData["page"] = page+''

      // console.log(page);
      
      // this.TendersNews.all_news(this.section_id||'',this.filterData['sort'],this.filterData['search'],this.filterData['page']).subscribe(res => {
      //   this.page.current_page = res.data?.current_page as number
      //    this.page.last_page =  res.data?.last_page  as number
      //    this.News = res.data?.data
      //    window.scroll(0,0);
      // })
  
}

}