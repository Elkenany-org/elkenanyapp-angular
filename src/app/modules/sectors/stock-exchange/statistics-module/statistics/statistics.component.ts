import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { StatisticsService } from '../_core/statistics.service';
import { StatisticsSubsSections, Statistics_Search_Form, ChangesMember } from '@core/interfaces/stock-exchanges/statistics';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Fillter } from '@app/@shared/classes/filter';
import { StatisticsChart } from '@shared/classes/drowShart.class';
import { AuthService } from './../../../../../@core/services/auth.service';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
	
	chartOptions:any
  
  StatisticsMember?:StatisticsSubsSections
  StatisticsMemberSlected? :ChangesMember[]

  fromToForm!:FormGroup
  h_search_form:any
  type!:string
  id: string = ''
/////////////////////
  fillter =   new Fillter()
  chart  = new StatisticsChart()

///////////////////////
  constructor(private statistics: StatisticsService,
              private roure: ActivatedRoute,
              private fb:FormBuilder,
              private router:Router,
              private auth : AuthService) {
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
      this.StatisticsMemberSlected = [this.StatisticsMember?.changes_subs.find(i => i.id ==id)] as ChangesMember[]
      this.chartOptions=  this.chart.drowShart([this.StatisticsMember?.changes_subs.find(i => i.id ==id)])
    }else {
      this.id = ''
      this.StatisticsMemberSlected =this.StatisticsMember?.changes_subs
      this.chartOptions=  this.chart.drowShart( this.StatisticsMember?.changes_subs)

    }


  }




  filter(value:any,type:string):void { //type come from small screen
    if(type){ //this  condation works only  at small view port screen
      let f = this.fromToForm.controls 
      this.getStatisticsData(this.type,f['from'].value,f['to'].value,this.id)
    }else{
      let f = this.fillter.filterdata
      this.fillter.filter(value)
      this.getStatisticsData(this.type,f['from'],f['to'],this.id)
    }
  }

  getStatisticsData(type:string,from:string, to:string,id:string){
    this.statistics.StatisicsSubSections(type,from,to,id).subscribe(res => {
      this.StatisticsMember=res.data
      this.StatisticsMemberSlected = res.data?.changes_subs
      this.chartOptions=  this.chart.drowShart( res.data!.changes_subs)

   
    })
  }
  
}
