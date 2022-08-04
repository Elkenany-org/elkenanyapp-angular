import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { StatisticsService } from '../_core/statistics.service';
import {
  StatisticsSubsSections,
  Statistics_Search_Form,
  ChangesMember,
} from '@core/interfaces/stock-exchanges/statistics';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Fillter } from '@app/@shared/classes/filter';
import { StatisticsChart } from '@shared/classes/drowShart.class';
import { Token } from '@angular/compiler';
import { AuthService } from '@app/@core/services/auth/auth.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  chartOptions: any;

  StatisticsMember?: StatisticsSubsSections;
  StatisticsMemberSlected?: ChangesMember[];

  fromToForm!: FormGroup;
  h_search_form: any;
  type!: string;
  id: string = '';
  /////////////////////
  fillter = new Fillter();
  chart = new StatisticsChart();
  days:number=0
alert:boolean=false
  // all?: ChangesMember[];
  // sixmonth?:ChangesMember[];
  // threemonth?:ChangesMember[];
  // onemonth?:ChangesMember[];

  ///////////////////////
  constructor(
    private statistics: StatisticsService,
    private roure: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    // const result = this.subtractDays(90);
    // console.log(this.subtractDays(61, new Date()));
    let tempOneMonth=[];

    this.roure.data.subscribe((data) => {
      console.log(data['resolve']);
      this.StatisticsMember = data['resolve'].data;
      this.StatisticsMemberSlected = data['resolve'].data?.changes_subs;
        this.chartOptions = this.chart.drowShart(
        data['resolve'].data!.changes_subs
      );
      // console.log(data['resolve'].data.changes_subs[0].changes[data['resolve'].data.changes_subs[0].changes.length-1].date);
      
      // if(data['resolve'].data.changes_subs[0].changes[0].date < this.subtractDays(61, new Date()) ){
      //     this.days=0
      // }else if(data['resolve'].data.changes_subs[0].changes[data['resolve'].data.changes_subs[0].changes.length-1].date <= this.subtractDays(30, new Date()) ){
      //     this.days=30
      // }
      // setTimeout(() => {data['resolve'].data.changes_subs[0].changes[data['resolve'].data.changes_subs[0].changes.length-1].date >= this.subtractDays(30, new Date())
      //     this.geTstatisticsByDate(30);
      // }, 100);   
    
    });   

    this.h_search_form = Statistics_Search_Form;
    this.fromToForm = this.fb.group({
      country: [],
      from: [],
      to: [],
    });
    let url = this.router.url.split('/');
    this.type = url[url.length - 2]; //get type from url
    // this.id = sector.find(i => i.type == this.type)?.id+''
    // this.geTstatisticsByDate(180)

    this.h_search_form.title=localStorage.getItem('stockTitle')
 

  }

  selectStock(id: any) {
    this.days=30
    if (id != 0) {
      this.id = id;
      this.StatisticsMemberSlected = [
        this.StatisticsMember?.changes_subs.find((i) => i.id == id),
      ] as ChangesMember[];
      this.chartOptions = this.chart.drowShart([
        this.StatisticsMember?.changes_subs.find((i) => i.id == id),
      ]);
    } else {
      this.id = '';
      this.StatisticsMemberSlected = this.StatisticsMember?.changes_subs;
      this.chartOptions = this.chart.drowShart(
        this.StatisticsMember?.changes_subs
      );
    }

    let name=this.StatisticsMemberSlected?.find(i => i.id == id)?.name
    if(name==undefined){
      name='الكل'
    }
      document.getElementById('stock')!.innerText = ''+name;

  }

  filter(value: any, type: string): void {
    //type come from small screen
    if (type) {
      //this  condation works only  at small view port screen
      let f = this.fromToForm.controls;

      this.getStatisticsData(
        this.type,
        f['from'].value,
        f['to'].value,
        this.id
      );
    } else {
      let f = this.fillter.filterdata;
      this.fillter.filter(value);
      this.getStatisticsData(this.type, f['from'], f['to'], this.id);
    }
  }

  getStatisticsData(type: string, from: string, to: string, id: any) {
    this.alert=false
    this.statistics
      .StatisicsSubSections(type, from, to, id)
      .subscribe((res) => {
        // this.StatisticsMember = res.data;
        this.StatisticsMemberSlected = res.data?.changes_subs;
        this.chartOptions = this.chart.drowShart(res.data!.changes_subs);
        console.log(this.chartOptions);

        setTimeout(() => {
          // this.StatisticsMember = res.data;
          this.StatisticsMemberSlected = res.data?.changes_subs;
          this.chartOptions = this.chart.drowShart(res.data!.changes_subs);
        }, 50);
      },
      (err)=>{this.alert=true});

      // if (id != 0) {
      //   this.id = id;
      //   this.StatisticsMemberSlected = [
      //     this.StatisticsMember?.changes_subs.find((i) => i.id == id),
      //   ] as ChangesMember[];

      // } else {
      //   this.id = ''
      //   this.StatisticsMemberSlected = this.StatisticsMember?.changes_subs;
      // }
  }

  // threemonth(){
  //   let today =new Date();
  //   var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  //   console.log(date);

  // }

  subtractDays(numOfDays: number, date = new Date()) {
    date.setDate(date.getDate() - numOfDays);
    let shortDate =
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    return shortDate;
  }

  geTstatisticsByDate(days: number): void {
    this.days= days
    if (days == 0) {
      this.getStatisticsData(this.type, '', '', this.id);
      return;
    }
    let date = new Date();
    let today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    let from = this.subtractDays(days);
    this.getStatisticsData(this.type, from, today, this.id);
    console.log(this.type);
    console.log(from);
  }

  navigate(){
    this.router.navigate([`/stock-exchange/poultry/statistics/statistics-detials/notype/${this.id}`])
  }
}
