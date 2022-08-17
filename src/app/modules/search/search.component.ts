import { Component, OnInit } from '@angular/core';
import { Search } from '@app/@core/interfaces/_app/app-response';
import { ActivatedRoute } from '@angular/router';
import { Result } from './../../@core/interfaces/_app/app-response';
import { SearchService } from '@app/@core/services/modules/search/search.service';

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
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(prm => {
      this.word= prm['word']
    })
    this.route.data.subscribe(res => {      
      this.data = res['resolve'].data as Search
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
    })
  }

  goSearch(word:any) {
    this.searchService.search(word).subscribe(res => {
      this.data= res.data
      // console.log(this.data);
      
    })
  } 
       //magazines        // GROO MEDIA +
       // showes          //Advanced Manufacturing East +
       //fodder_stock_sub //بورصة أعلاف الشركات  + 
       // local_stock_sub //بورصة بيض المائدة  +
        //"guide_sub_sections // معامل التفريخ  + 
        //companies // مجموعة حسن الغريب +
        //stores //قلين كفر الشيخ *
        //news // أسعار الدواجن اليوم الثلاثاء 7-6-2022


}
