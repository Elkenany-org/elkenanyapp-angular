import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StatisticsMember, StatisticsSubsSections } from '../_core/statistics';
import { StatisticsService } from '../_core/statistics.service';
import { sector } from './../../../../../@core/@data/app/filter-list';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  chart: any;
	
	chartOptions:any
                   

  StatisticsMember?:StatisticsSubsSections

  type!:string
  id!: string



   arr2:any=[]

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
        
        let changesData= res.data!.changes_subs
        var Result:any = [];
  
        for(let i=0 ; i < changesData.length ; i++){
          Result.push(changesData[i]?.changes);



          for(let k=0 ; k < Result.length ; k++){
            this.arr2.push({
              type: "line",
              showInLegend: true,
              name: changesData[k].name,
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
            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
              e.dataSeries.visible = false;
            } else {
              e.dataSeries.visible = true;
            } 
            e.chart.render();
          }
          },
          data: this.arr2
      
        
        }	
        
      })
    })








     
  }

}
