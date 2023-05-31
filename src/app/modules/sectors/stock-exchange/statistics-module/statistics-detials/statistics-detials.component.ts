import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../_core/statistics.service';
import { ActivatedRoute } from '@angular/router';
// import { StatisicsStocksDetials } from './../_core/statistics';
import { StatisicsStocksDetials } from '@core/interfaces/stock-exchanges/statistics';
import { StatisticsMembersDetials } from './../../../../../@core/interfaces/stock-exchanges/statistics';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-statistics-detials',
  templateUrl: './statistics-detials.component.html',
  styleUrls: ['./statistics-detials.component.scss']
})
export class StatisticsDetialsComponent implements OnInit {
  data?: StatisicsStocksDetials 
  dataLocalOrFodder?: StatisticsMembersDetials
  id!:string
  filterData={
    type:'',
    from:'',
    to: ''
  }
  title:string='إحصائيات';
  constructor(private statistics: StatisticsService,
              private route: ActivatedRoute,private titleService:Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(' إحصائيات '+localStorage.getItem('title'));
    this.title=' إحصائيات '+localStorage.getItem('title')+' - '+localStorage.getItem('type')
    this.route.params.subscribe(prm => {
      this.id= prm['id']
      if( prm['type'] === 'المحلية'){
        this.filterData['type']='local';
      }else 
      if(prm['type'] === 'الأعلاف') {  
        this.filterData['type']='fodder';
      }
  
      // this.filterData['type']=prm['type']
      if(this.filterData['type'] === 'local' || this.filterData['type'] ===   'fodder') {        
        this.getStatisicsMembersDetials(this.filterData['type'],'','',this.id)
      }else {
        this.getstatisicsDetailsData( this.id,'','')
      }
    })
  }

  filter(value:{date:string, type:string}):void {
    // console.log(value);
    
    let f= this.filterData
    value.type=='from'? f.from = value.date:f.from = value.date
    if(this.filterData['type'] == 'local' || this.filterData['type']=='fodder') {

    }else
    this.filterData['type']
    this.getstatisicsDetailsData(this.id,f.from,f.to)
  }

  getStatisicsMembersDetials( type:string,from:string,to:string,id:string){
    this.statistics.StatisicsMembersDetials(type,from,to,id).subscribe(res => {
      this.dataLocalOrFodder= res.data
    })
  }

  getstatisicsDetailsData(id:string, from:string,to:string){
    this.statistics.StatisicsStocksDetials(id,from,).subscribe(res => {
      
      this.data= res.data
    })  
  }

 
}
