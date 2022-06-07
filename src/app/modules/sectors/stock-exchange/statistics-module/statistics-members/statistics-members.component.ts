import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { StatisticsService } from '../_core/statistics.service';
import { StatisticsSubsSections, Statistics_Search_Form, StatisticsMembersLocal, ChangesMember } from '@core/interfaces/stock-exchanges/statistics';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Fillter } from '@app/@shared/classes/filter';
import { StatisticsChart } from '@shared/classes/drowShart.class';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics-members.component.html',
  styleUrls: ['./statistics-members.component.scss']
})
export class StatisticsMembersComponent implements OnInit {
	
  
  StatisticsMember?:StatisticsMembersLocal
  StatisticsMemberSlected? :ChangesMember[]
  fromToForm!:FormGroup
  h_search_form:any
  type!:string
  id: string = ''
/////////////////////
  chartOptions:any
  fillter= new Fillter()
  chart  = new StatisticsChart()
///////////////////////
  constructor(private statistics: StatisticsService,
              private roure: ActivatedRoute,
              private fb:FormBuilder) {}

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
      this.StatisticsMemberSlected = [this.StatisticsMember?.changes_members.find(i => i.id ==id)] as ChangesMember[]
      this.chartOptions=  this.chart.drowShart( [this.StatisticsMember?.changes_members.find(i => i.id ==id)])
    }else {
      this.id = ''
      this.StatisticsMemberSlected =this.StatisticsMember?.changes_members
      this.chartOptions=  this.chart.drowShart( this.StatisticsMember?.changes_members)
    }
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
       this.StatisticsMember=res.data
       this.StatisticsMemberSlected = res.data?.changes_members
       this.chartOptions=  this.chart.drowShart(res.data!.changes_members)
    })
  }
}
