import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { News_Search_Form_Data, Tenders_Home_Search_Form_Data, Tenders_Search_Form_Data } from '@app/@core/@data/app/news/news';
import { allSections } from '@app/@core/interfaces/news/news';
import { JsonFormData } from '@app/@core/interfaces/_app/horizontal-search';
import { BannersLogoservice } from '@app/@core/services/Banners-logos.service';
import { TendersService } from '@app/@core/services/modules/tenders/tenders.service';
import { map } from 'rxjs';
import { Location } from '@angular/common';
import { Banner, Logo } from '@app/@core/interfaces/_app/app-response';
@Component({
  selector: 'app-tenders-home',
  templateUrl: './tenders-home.component.html',
  styleUrls: ['./tenders-home.component.scss']
})
export class TendersHomeComponent implements OnInit {

  private flagFirsttime:boolean=false;
  public loading: boolean = true   
  public h_search_form: JsonFormData | any 
 public tenders_Home_Data?: allSections 
  id:string=""
  public page= {last_page: 0, current_page:0}

 public filterData:{[key:string]:string}= {
  type:"",
  sort:"",
  search:"",
  page:''
}
  constructor(
    private Activatedroute: ActivatedRoute,
    private tenderService: TendersService,
    private router: Router,  
    private location: Location,
    private BannerLogoService:BannersLogoservice,
    private titleService:Title
) { 

}

  ngOnInit(): void {

    this.titleService.setTitle(' المناقصات ');
  
    this.h_search_form = Tenders_Home_Search_Form_Data //set initial data to horizontal component 

      this.Activatedroute.queryParamMap.subscribe((params) => {
        if(this.flagFirsttime){
          this.page.current_page = +params.get('page')!;
          this.tenderService.all_sections(params.get('sort')+'',this.filterData['search'],this.page.current_page+'').subscribe(res => {
          this.page.current_page = res.data?.current_page as number
          this.page.last_page =  res.data?.last_page  as number
          this.tenders_Home_Data = res.data  
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
      this.tenders_Home_Data = res['resolve'].data  as allSections
      this.BannerLogoService.setBanner(res['resolve'].data.banners);
      this.BannerLogoService.setLogo(res['resolve'].data.logos);
      this.loading = false;      
      this.flagFirsttime=true
    })





      this.tenderService.filter_home().subscribe(
        (res) => {
        this.h_search_form.controls.find((i:any) => i.role === "sort").option =   res.data?.sort;
        this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id != 2).selected=0
        this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id == 2).selected=1
      }) 
  

  }

  filter(value:any) {
    let flag=false;
    let sort='';   
    this.Activatedroute.params.subscribe( params => {
      // this.filterData['sector'] = params['type']
      switch ( value.type ) {
        case "sort":
          if(value.id == 2){
            this.filterData['sort'] = ''
          }else{
            this.filterData['sort'] = value.id 
          }

          this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id == value.id).selected=1
          this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id != value.id).selected=0   

          break;
          case "search":
            this.filterData['search'] = value.name 
            break;
        default: 
          break;
     }

     this.tenderService.all_sections(this.filterData['sort'], this.filterData['search'],'1').subscribe( res => {
        this.tenders_Home_Data = res.data  as allSections
        this.BannerLogoService.setBanner(res.data?.banners as Banner[]);
        this.BannerLogoService.setLogo(res.data?.logos as Logo[]);
        this.page.current_page = res.data?.current_page as number
        this.page.last_page =  res.data?.last_page  as number
        this.loading = false;
        // this.location.go(`/tenders`,`page=1`);
        this.router.navigate([`tenders`], { queryParams: {sort:this.filterData['sort'], page: this.page.current_page } });
      })
    })
  }
  navigate(id: string): void
  {
    this.router.navigate([`tenders/${id}`], { queryParams: { sort:'', page: 0 } });
  }

  next_page(page:number):void{
 
    this.router.navigate([`tenders`], { queryParams: { sort:this.filterData['sort'], page: page } });
    window.scroll(0,0);

    // this.filterData["page"] = page+''
    // this.tenderService.all_sections(this.filterData['sort'],this.filterData['search'],this.filterData['page']).subscribe(res => {
    //   this.page.current_page = res.data?.current_page as number
    //    this.page.last_page =  res.data?.last_page  as number
       
    //   // this.location.go(`/tenders/page/${page}`);
    //   //  this.router.navigate([`tenders/page/${page}`]);
    //    this.tenders_Home_Data = res.data

    // })

}

}
