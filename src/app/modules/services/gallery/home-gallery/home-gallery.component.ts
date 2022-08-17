import { Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { Gallries, Gallries_Search_Form } from '@app/@core/interfaces/gallery/gallery';
import { Banner, FilterList, Logo } from '@app/@core/interfaces/_app/app-response';
import { JsonFormData } from '@app/@core/interfaces/_app/filter-list';
import { GallaryService } from '@app/@core/services/modules/gallery/gallary.service';
import { BannersLogoservice } from '@app/@core/services/Banners-logos.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-gallery',
  templateUrl: './home-gallery.component.html',
  styleUrls: ['./home-gallery.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class HomeGalleryComponent implements OnInit {
  loading!:boolean
  galleryData?:Gallries[]
  search_form :JsonFormData | any 
  public page= {last_page: 0, current_page:0}

  public filterData:{[key:string]:string}= {
    sector:'poultry',
    countries:'',
    cities:'',
    sort:"0",
    search:"",
    page:''

  }
  constructor(private route: ActivatedRoute,
              private galleryService: GallaryService,
              private bannrrsLogos: BannersLogoservice,
              private location: Location,
              private router: Router,
              private titleService:Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("المعارض");
    this.search_form = Gallries_Search_Form
    this.route.data.subscribe(data => {
      // console.log(data['resolve']);
      this.page.current_page = data['resolve'].data!.current_page
      this.page.last_page =data['resolve'].data!.last_page
      this.galleryData= data['resolve'].data?.data 
      this.bannrrsLogos.setBanner(data['resolve'].data?.banners as Banner[])
      this.bannrrsLogos.setLogo(data['resolve'].data?.logos as Logo[])

      

      this.galleryService.filter_list('poultry','1').subscribe((res:ApiResponse<FilterList>) => {
        // override data to match the data format of horizontal components
        this.search_form.controls.find((i:any) => i.role === "sector").option = res.data?.sectors
        this.search_form.controls.find((i:any) => i.role === "sort").option =   res.data?.sort;
        this.search_form.controls.find((i:any) => i.role === "countries").option =   res.data?.countries;
        this.search_form.controls.find((i:any) => i.role === "cities").option =   res.data?.cities;
        
    this.search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id === 2).selected=1
    this.search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id !== 2).selected=0

      }) 

    })
 

  }

  filter(value:any) {
    let sort='0'

    switch ( value.type ) {
      case "sector":
        
        this.search_form.controls.find((i:any) => i.role === "sector").option.find((i:any) => i.id === value.id).selected=1
        this.search_form.controls.find((i:any) => i.role === "sector").option.find((i:any) => i.id !== value.id).selected=0
        this.filterData['sector'] = value.name
        // console.log(this.filterData['sector']);

          break;
      case "countries":
        this.filterData['countries'] = value.id

        this.galleryService.filter_list(this.filterData['sector'],this.filterData['countries']).subscribe((res:ApiResponse<FilterList>) => {
          // override data to match the data format of horizontal components
          this.search_form.controls.find((i:any) => i.role === "cities").option =   res.data?.cities;
        }) 
          break;
      case "cities":
        this.filterData['cities'] = value.id
          break;
      case "sort":
        this.filterData["sort"] = value.id
        this.search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id === value.id).selected=1
        this.search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id !== value.id).selected=0
        sort = this.search_form.controls.find((i:any) => i.role === "sort").option.find((i:any) => i.id === value.id).value
        // console.log(value.id);
        
        if(value.id=='1'){
          sort='0'
        }
        else if(value.id=='2'){
          sort='2'
        }
        this.filterData["sort"]=sort
        break;
      case "search":
        this.filterData['search'] = value.name 
        break;
      default: 
          // 
          break;
   }
   this.galleryService.galleries(this.filterData).subscribe(res => {
    // console.log(this.filterData)
    // console.log(res)

    this.galleryData= res.data?.data 
    this.bannrrsLogos.setBanner(res.data?.banners as Banner[])
    this.bannrrsLogos.setLogo(res.data?.logos as Logo[])
    // console.log(res.data);

   })
   this.location.go(`gallery/${this.filterData['sector']}`);

  }

  navigate(id: string): void {
    // console.log(id)
    this.router.navigate([`gallery/${this.filterData['sector']}/${id}`])
  }

  next_page(page:number):void{
    this.filterData["page"] = page+''
    this.galleryService.galleries(this.filterData).subscribe(res => {
      this.page.current_page = res.data!.current_page
      this.page.last_page =res.data!.last_page
      this.galleryData= res.data?.data 
    })

  }
}
