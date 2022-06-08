import { Component, OnInit } from '@angular/core';
import { Search } from '@app/@core/interfaces/_app/app-response';
import { SearchService } from '../../../@core/services/app/gallery/search/search.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  data?:any
  constructor(
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.data.subscribe(res => {
      this.data = res['resolve'].data
      
    })

    // this.route.params.subscribe(prm => {
    //   console.log(prm['word']);
    //   this.goSearch(prm['word'])
      
    // })
  }

  selected(value:{id:number, type:string}) {
    console.log(value);


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
        
       //magazines        // GROO MEDIA
       // showes          //Advanced Manufacturing East
       //fodder_stock_sub //بورصة أعلاف الشركات 
       // local_stock_sub //بورصة بيض المائدة
        //"guide_sub_sections
        // بورصة البقوليات
        default:
          break
        
    }
    
  }


  goSearch(word:any) {

    this.searchService.search(word).subscribe(res => {
      this.data= res.data
      console.log(this.data);
      
    })



    
  }

}
