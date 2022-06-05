import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { StatisticsService } from '../_core/statistics.service';
import { sector } from './../../../../../@core/@data/app/filter-list';
import { number } from 'echarts';
import { StatisticsSubsSections, Statistics_Search_Form } from '@core/interfaces/stock-exchanges/statistics';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Fillter } from '@app/@shared/classes/filter';
import { ToasterService } from '@app/@shared/services/toastr.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
	
	chartOptions:any
  
  StatisticsMember?:StatisticsSubsSections
  fromToForm!:FormGroup
  h_search_form:any
  type!:string
  id: string = ''
/////////////////////
  arr2:any=[]
  StatisticsMemberSlected? :any

  fillter =   new Fillter()

///////////////////////
  constructor(private statistics: StatisticsService,
              private roure: ActivatedRoute,
              private fb:FormBuilder,
              private router:Router,
              private toster:ToasterService) {
               }



  ngOnInit(): void {
    this.h_search_form = Statistics_Search_Form
    this.fromToForm= this.fb.group({
      country: [],
      from: [],
      to:[]
    })
    let url =  this.router.url.split('/') 
    this.type =  url[url.length-2] //get type from url 
    // this.id = sector.find(i => i.type == this.type)?.id+''
    this.roure.params.subscribe((prm: Params) => {
      this.getStatisticsData(this.type,'','','')
    })
  }


  selectStock(id:any) {
    if(id!=0) {
      this.id = id
      this.StatisticsMemberSlected = [this.StatisticsMember?.changes_subs.find(i => i.id ==id)]
      this.drowShart( [this.StatisticsMember?.changes_subs.find(i => i.id ==id)] )
    }else {
      this.id = ''
      this.StatisticsMemberSlected =this.StatisticsMember?.changes_subs
      this.drowShart( this.StatisticsMember?.changes_subs )
    }
  }

  drowShart(data:any) {
    this.arr2=[]
    let Result= [];
    for(let i=0 ; i < data.length ; i++){
      Result.push(data[i]?.changes);
    }
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
        // console.log("dds");
        
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
          // console.log(e);


          e.dataSeries.visible = false;
          // console.log('d');

        } else {
          // console.log(e);

          e.dataSeries.visible = true;
        } 
        e.chart.render();
      }
      },
      data: this.arr2
    }	

// console.log(this.arr2);

  }



  filter(value:any,type:string):void { //type come from small screen

     
    if(type){ //this  condation works only  at small view port screen
      let f = this.fromToForm.controls 
      this.getStatisticsData(this.type,f['from'].value,f['to'].value,this.id)
    }else{
      let f = this.fillter.filterdata
      this.toster.loading('حاري التحميل')
      this.fillter.filter(value)
      this.getStatisticsData(this.type,f['from'],f['to'],this.id)

    }

  
  }




  getStatisticsData(type:string,from:string, to:string,id:string){
    this.statistics.StatisicsSubSections(type,from,to,id).subscribe(res => {
      console.log(res);
      
      this.toster.stopLoading()
      this.StatisticsMember=res.data
      this.StatisticsMemberSlected = res.data?.changes_subs
      this.drowShart(res.data!.changes_subs)
   
    })
  }
  
}
