import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../_core/statistics.service';
import { ActivatedRoute } from '@angular/router';
// import { StatisicsStocksDetials } from './../_core/statistics';
import { StatisicsStocksDetials } from '@core/interfaces/stock-exchanges/statistics';

@Component({
  selector: 'app-statistics-detials',
  templateUrl: './statistics-detials.component.html',
  styleUrls: ['./statistics-detials.component.scss']
})
export class StatisticsDetialsComponent implements OnInit {
  data?: StatisicsStocksDetials
  id!:string
  filterData={
    from:'',
    to: ''
  }
  constructor(private statistics: StatisticsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(prm => {
      this.id= prm['id']
      this.getstatisicsDetailsData( this.id,'','')
    })
    
  }

  filter(value:{date:string, type:string}):void {
    let f= this.filterData
    value.type=='from'? f.from = value.date:f.from = value.date
    this.getstatisicsDetailsData(this.id,f.from,f.to)

  }

  getstatisicsDetailsData(id:string, from:string,to:string){
    this.statistics.StatisicsStocksDetials(id,from,).subscribe(res => {
      console.log(res);
      
      this.data= res.data
    })  
  }
 
}
