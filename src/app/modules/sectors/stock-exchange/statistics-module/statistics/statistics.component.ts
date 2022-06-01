import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
// import { StatisticsMember, StatisticsSubsSections } from '../_core/statistics';
import { StatisticsService } from '../_core/statistics.service';
import { sector } from './../../../../../@core/@data/app/filter-list';
import { number } from 'echarts';
import { StatisticsSubsSections } from '@core/interfaces/stock-exchanges/statistics';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
	
	chartOptions:any
  StatisticsMember?:StatisticsSubsSections

  type!:string
  id!: string
/////////////////////
  arr2:any=[]
  StatisticsMemberSlected? :any
///////////////////////
  constructor(private statistics: StatisticsService,
              private roure: ActivatedRoute,
              private router:Router) {
               }



  ngOnInit(): void {
    let url =  this.router.url.split('/') 
    this.type =  url[url.length-2] //get type from url 
    this.id = sector.find(i => i.type == this.type)?.id+''
    this.roure.params.subscribe((prm: Params) => {
      this.statistics.StatisicsSubSections(this.type,'','','').subscribe(res => {
        this.StatisticsMember=res.data
        this.StatisticsMemberSlected = res.data?.changes_subs
        this.drowShart(res.data!.changes_subs)
     
      })
 
    })


  }


  selectStock(id:any) {

    if(id!=0) {

      this.StatisticsMemberSlected = [this.StatisticsMember?.changes_subs.find(i => i.id ==id)]
      
      this.drowShart( [this.StatisticsMember?.changes_subs.find(i => i.id ==id)] )

      

      
    }else {
      this.StatisticsMemberSlected =this.StatisticsMember?.changes_subs
      this.drowShart( this.StatisticsMember?.changes_subs )
    }
  }

  drowShart(data:any) {
      this.arr2=[]

    let Result= [];
    for(let i=0 ; i < data.length ; i++){
      Result.push(data[i]?.changes);
      for(let k=0 ; k < Result.length ; k++){
        this.arr2.push({
          type: "line",
          showInLegend: true,
          name: data[k].name,
          xValueFormatString: "MMM DD, YYYY",
          dataPoints: []
        })
        for(let j=0 ; j < Result[k].length ; j++){
          this.arr2[k].dataPoints.push( { x:  new Date(Result[k][j].date), y: Result[k][j].change})
        }
      }
    }
    this.chartOptions ={
      animationEnabled: true,
      theme: "light2",
      title:{
      // text: "Actual vs Projected Sales"
      },
      axisX:{
      valueFormatString: "D MMM"
      },
      axisY: {
      // title: "Number of Sales"
      },
      toolTip: {
      shared: true
      },
      legend: {
      cursor: "pointer",
      itemclick: function (e: any) {
        console.log("dds");
        
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
          console.log(e);


          e.dataSeries.visible = false;
          console.log('d');

        } else {
          console.log(e);

          e.dataSeries.visible = true;
        } 
        e.chart.render();
      }
      },
      data: this.arr2
    }	


  }

  
}
