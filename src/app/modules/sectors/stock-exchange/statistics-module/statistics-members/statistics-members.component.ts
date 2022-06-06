import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { StatisticsService } from '../_core/statistics.service';
import { StatisticsSubsSections, Statistics_Search_Form, StatisticsMembersLocal } from '@core/interfaces/stock-exchanges/statistics';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Fillter } from '@app/@shared/classes/filter';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics-members.component.html',
  styleUrls: ['./statistics-members.component.scss']
})
export class StatisticsMembersComponent implements OnInit {
	
	chartOptions:any
  
  StatisticsMember?:StatisticsMembersLocal
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
              private router:Router) {
               }



  ngOnInit(): void {
    this.h_search_form = Statistics_Search_Form
    this.fromToForm= this.fb.group({
      country: [],
      from: [],
      to:[]
    })
    
    this.roure.params.subscribe((prm: Params) => {
    this.id=  prm['id']//get type from url 
    this.type= prm['type']
    this.getStatisticsMemberData(this.id,this.type,'','')
    })
  }


  selectStock(id:any) {
    if(id!=0) {
      this.id = id
      this.StatisticsMemberSlected = [this.StatisticsMember?.changes_members.find(i => i.id ==id)]
      this.drowShart( [this.StatisticsMember?.changes_members.find(i => i.id ==id)] )
    }else {
      this.id = ''
      this.StatisticsMemberSlected =this.StatisticsMember?.changes_members
      this.drowShart( this.StatisticsMember?.changes_members )
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
      this.getStatisticsMemberData(this.id,this.type,f['from'].value,f['to'].value)
    }else{
      let f = this.fillter.filterdata
      this.fillter.filter(value)
      this.getStatisticsMemberData(this.id,this.type,f['from'],f['to'])

    }

  
  }




  getStatisticsMemberData(id:string,type:string,from:string, to:string){
    this.statistics.StatisicsMembersLocal(id, type, from, to, 'mem_id').subscribe(res => {
      console.log(res);
      
       this.StatisticsMember=res.data
       this.StatisticsMemberSlected = res.data?.changes_members
       this.drowShart(res.data!.changes_members)
   
    })
  }
  
}
