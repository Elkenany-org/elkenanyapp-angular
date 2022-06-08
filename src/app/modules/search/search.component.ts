import { Component, OnInit } from '@angular/core';
import { Search } from '@app/@core/interfaces/_app/app-response';
import { SearchService } from '../../@core/services/app/gallery/search/search.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Result } from './../../@core/interfaces/_app/app-response';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  data?:Search
  word?: string
  categories?: {[key: string]: Result[]} = {
    'stores':[],
    'news':[],
    'showes':[],
    'companies':[],
    'magazines':[],
    'guide_sub_sections':[],
    'fodder_stock_sub':[],
    'local_stock_sub':[],
  }
  constructor(
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(prm => {
      this.word= prm['word']
    })
    this.route.data.subscribe(res => {      
      this.data = res['resolve'].data as Search
      console.log(this.data);
      if(this.data?.result && this.data?.result.length>0){
       this.categories = {
          'stores':[],
          'news':[],
          'showes':[],
          'companies':[],
          'magazines':[],
          'guide_sub_sections':[],
          'fodder_stock_sub':[],
          'local_stock_sub':[],
        }
        this.data?.result.forEach((item:Result) => {
        
          switch(item.type){
            case "stores":
              this.categories?.['stores'].push(item)
              break
            case "news":
              this.categories?.['news'].push(item)
              break
            case "showes":
              this.categories?.['showes'].push(item)
              break
            case "companies":
              this.categories?.['companies'].push(item) 
              break
            case "magazines":
              this.categories?.['magazines'].push(item) 
              break
            case "guide_sub_sections":
              this.categories?.['guide_sub_sections'].push(item) 
              break
            case "fodder_stock_sub": 
            this.categories?.['fodder_stock_sub'].push(item)
              break
            case "local_stock_sub":
              this.categories?.['local_stock_sub'].push(item) 
              break
            default:
              break
          }
  
  
        })
      }
  
        console.log(this.categories);

    })
  }

  selected(value:{id:number, type:string}) {
    switch(value.type){
      case "stores":
        this.router.navigate(['/market/poultry/ad_details/',value.id])
        console.log("stores");
        break
      case "news":
        this.router.navigate(['/news/poultry/',value.id])
        console.log("news");
        break
      case "showes":
        this.router.navigate(['/gallery/poultry/',value.id,'about'])
        console.log("showes");
        break
      case "companies": 
        this.router.navigate(['/companies-guide/poultry/companies_details/no/',value.id])
        console.log("companies");
        break
      case "magazines": 
        this.router.navigate(['/magazine/details/',value.id])
        console.log("magazines");
        break
      case "guide_sub_sections": 
        this.router.navigate(['/companies-guide/animal/companies/no/',value.id,])
        console.log("guide_sub_sections");
        break
      case "fodder_stock_sub": 
      this.router.navigate(['/stock-exchange/poultry/stock-exchange/no/fodder/',value.id])
        console.log();
        break
      case "local_stock_sub": 
        this.router.navigate(['/stock-exchange/poultry/stock-exchange/no/local/',value.id])
        console.log();
        break
      default:
        break
    }
    
  }

        
       //magazines        // GROO MEDIA
       // showes          //Advanced Manufacturing East
       //fodder_stock_sub //بورصة أعلاف الشركات 
       // local_stock_sub //بورصة بيض المائدة
        //"guide_sub_sections // معامل التفريخ 
        //companies // مجموعة حسن الغريب
        //stores //قلين كفر الشيخ *
        //news // أسعار الدواجن اليوم الثلاثاء 7-6-2022
  goSearch(word:any) {
    this.searchService.search(word).subscribe(res => {
      this.data= res.data
      console.log(this.data);
      
    })



    
  }

}
