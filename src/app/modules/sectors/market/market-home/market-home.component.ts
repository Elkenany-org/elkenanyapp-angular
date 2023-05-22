import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { map } from 'rxjs';
import { BannersLogoservice } from '@app/@core/services/Banners-logos.service';
import { Location } from '@angular/common';
import { Banner, Logo } from '@app/@core/interfaces/_app/app-response';
import { MarktData } from '@app/@core/interfaces/market/home';
import { market_Search_Form_Data } from '@app/@core/interfaces/market/market-home-data';
import { MarketService } from '@app/@core/services/modules/market/market.service';
import { JsonFormData } from '@app/@core/interfaces/_app/horizontal-search';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-market-home',
  templateUrl: './market-home.component.html',
  styleUrls: ['./market-home.component.scss']
})
export class MarketHomeComponent implements OnInit {
  private flagFirsttime:boolean=false;

  public loading: boolean = true

  public h_search_form?: JsonFormData  |any // nay be will not work 
  public Market_Data?: MarktData []
  public type!:string
  public page= {last_page: 0, current_page:0}

  // active:boolean=true;
  public filterData:{[key:string]:string}= {
    type:"",
    sort:"",
    search:"",
    page:'',
    date:""
  }
  constructor(
    private MarketService: MarketService,
    private router: Router,  
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private BannerLogoService:BannersLogoservice,
    private titleService:Title
  ) { }

  ngOnInit(): void {
    this.h_search_form = market_Search_Form_Data //set initial data to horizontal component 
    this.titleService.setTitle(' اعلانات السوق ');

    this.activatedRoute.queryParamMap.subscribe((params) => {
      if(this.flagFirsttime){
        this.page.current_page = +params.get('page')!;
        this.MarketService.market(this.type, params.get('sort')+'',this.filterData['search'],this.filterData['date'],this.page.current_page+'').subscribe(res => {
          this.page.current_page = res.data?.current_page as number
          this.page.last_page = res.data?.last_page as number
          this.Market_Data =res.data?.data 
    
        })
      }}
    );
 


    this.activatedRoute.params.subscribe(params => {
      this.type =params['type']
      this.MarketService.Filter_list(this.type).subscribe( res => {
        this.h_search_form.controls.find((i:any) => i.role === "sector").option = res.data?.sectors
        this.h_search_form.controls.find((i:any) => i.role === "sort").option =   res.data?.sort;
        this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id !== 2).selected=0
        this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id === 2).selected=1  

        this.type = this.h_search_form.controls.find((i:any) => i.role === "sector").option.find((i:any) => i.selected == 1).id
        this.location.go(`/market/${this.type}?sort=&page=1`); 

        if(! this.flagFirsttime){
        this.type = this.h_search_form.controls.find((i:any) => i.role === "sector").option.find((i:any) => i.selected == 1).id
        this.location.go(`/market/${this.type}`,`sort=&page=1`);
        }
      })
       })
       
      this.activatedRoute.data.pipe(
        map((data) => {
          return data['resolve'].data
        })
      ).subscribe(res => {  
        this.Market_Data =res.data
         this.page.current_page = res.current_page
         this.page.last_page =  res.last_page
        this.BannerLogoService.setBanner( res.banners);
        this.BannerLogoService.setLogo(res.logos);
        this.loading = false;
        this.flagFirsttime=true

      })

      // this.MarketService.my_ads(this.type).subscribe(res => {
      //   console.log(res)
      // })
   


  }

  filter(value:any) {
    this.activatedRoute.params.subscribe( params => {
      this.filterData['sector'] = params['type']
      this.filterData['date']=""
      switch ( value.type ) {
        case "sector":
          this.filterData['sector'] = value.id
            break;
        case "sort":
          this.filterData['sort'] = value.id 
          this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id === value.id).selected=1
          this.h_search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id !== value.id).selected=0
          break;
        case "date":
            this.filterData['date'] = value.name
            // console.log('date'+value.name);    
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

          this.MarketService.market(this.filterData['sector'], this.filterData['sort'],this.filterData['search'], this.filterData['date'],'').subscribe(res => {
      this.page.current_page = res.data?.current_page as number
      this.page.last_page = res.data?.last_page as number
      this.Market_Data =res.data?.data 
      this.BannerLogoService.setBanner( res.data?.banners as Banner[]);
      this.BannerLogoService.setLogo(res.data?.logos as Logo[]);
      this.h_search_form.controls.find((i:any) => i.role === "sector").option =res.data?.sectors
      this.type = this.filterData['sector']
      // this.location.go(`market/${this.type}`);
      this.router.navigate(['/market/',this.filterData['sector']], { queryParams: {sort:this.filterData['sort'], page: this.page.current_page } })
      // this.location.go(`/market/${ this.filterData['sector'] }`,`sort=${this.filterData['sort']}&page=1`);

    })


  }

  navigate(id: string): void
  {
    // console.log(id)
    this.router.navigate([`/market/${this.type}/ad_details/${id}`]);
    
  }

  next_page(page:number):void{
    // this.filterData["page"] = page+''
    // this.filterData["sector"] =this.type
    this.router.navigate(['/market/',this.type], { queryParams: { sort:this.filterData['sort'], page: page } });
    window.scroll(0,0);
  }
}
