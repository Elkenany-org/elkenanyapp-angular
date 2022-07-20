import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { StatisticsService } from '../_core/statistics.service';
import { StatisticsSubsSections, Statistics_Search_Form, StatisticsMembersLocal, ChangesMember } from '@core/interfaces/stock-exchanges/statistics';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Fillter } from '@app/@shared/classes/filter';
import { StatisticsChart } from '@shared/classes/drowShart.class';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics-members.component.html',
  styleUrls: ['./statistics-members.component.scss']
})
export class StatisticsMembersComponent implements OnInit {


  StatisticsMemberGlobal?:StatisticsMembersLocal

  StatisticsMemberLocal?:StatisticsMembersLocal
  StatisticsMemberSlected? :ChangesMember[]
  ///
  StatisticsMemberFodder:any

  fromToForm!:FormGroup
  h_search_form:any
  type!:string
  id: string = ''
  fillter= new Fillter()
  chart  = new StatisticsChart()
	chartOptions :any


  days:number=0
  constructor(private statistics: StatisticsService,
              private roure: ActivatedRoute,
              private fb:FormBuilder) {}

  ngOnInit(): void {


    this.h_search_form = Statistics_Search_Form
    this.fromToForm= this.fb.group({
      // country: [],
      from: [],
      to:[]
    })

    this.roure.params.subscribe((prm: Params) => {
    this.id=  prm['id']//get type from url
    this.type= prm['type']



    this.roure.data.subscribe(data => {
      
      console.log(data['resolve']);
      if(this.type == "fodder"){
        console.log("fodder");
        this.StatisticsMemberLocal=data['resolve'].data

        this.chartOptions=  this.chart.drowShart(data['resolve'].data!.changes_members)
     
        this.StatisticsMemberFodder =this.fodderTable(data['resolve'].data!.changes_members)
        
      }else if (this.type == "local"){
        this.StatisticsMemberLocal=data['resolve'].data

        this.StatisticsMemberSlected = data['resolve'].data?.changes_members
        this.chartOptions=  this.chart.drowShart(data['resolve'].data!.changes_members)
        
      }

    })


    
    // this.getStatisticsMemberData(this.id,this.type,'','')
    })
   

  }

  selectStock(id:any) {
    if(id!=0) {
      this.id = id
      this.StatisticsMemberSlected = [this.StatisticsMemberLocal?.changes_members.find(i => i.id ==id)] as ChangesMember[]
      this.chartOptions=  this.chart.drowShart( [this.StatisticsMemberLocal?.changes_members.find(i => i.id ==id)])
    }else {
      this.id = ''
      this.StatisticsMemberSlected =this.StatisticsMemberLocal?.changes_members
      this.chartOptions=  this.chart.drowShart( this.StatisticsMemberLocal?.changes_members)
    }
  }



  filter(value:any,type:string):void { //type come from small screen

    if(type){ //this  condation works only  at small view port screen
       let f = this.fromToForm.controls
       console.log(this.id,this.type,f['from'].value,f['to'].value);

      //  this.getStatisticsMemberData(this.id,this.type,f['from'].value,f['to'].value)
     }else{
       let f = this.fillter.filterdata
        
       this.fillter.filter(value)
      console.log(this.id,this.type,f['from'],f['to']);
       if(f['to']=='' && f['from']!=''){
        let date = new Date();
          if(date.getMonth() + 1 < 10){
            f['to'] =date.getFullYear() + '-0' + (date.getMonth() + 1) + '-' + date.getDate();
      
          }
          else{
            f['to'] =date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
          }
               this.getStatisticsMemberData(this.id,this.type,f['from'],f['to'])
       }
       else{
        this.getStatisticsMemberData(this.id,this.type,f['from'],f['to'])
       }

       
     }
  }
  fodderTable(data: ChangesMember[]):any {
    
    let members= data
    let array:any = []
    for(let i = 0 ; i< members.length ; i++) {
      let is_item_exist= 0

      if(i+1 != members.length) {
        for (let j = 0; j < array.length; j++) {
          if(array[j].find((element:any) => members[i].name == element.name)){
            is_item_exist=1
          }else{
            is_item_exist=0
          }
        }
        if(is_item_exist==0) {
          array.push([
            {
               name:  members[i].name,
               categories: members.filter((element:any) => element.name == members[i].name)
            }
          ])    
        }
      }
    }
    return array

  }

  
  getStatisticsMemberData(id:string,type:string,from:string, to:string){
    console.log('from'+from);
    console.log('to:'+to);
    // this.StatisticsMemberGlobal=this.StatisticsMemberLocal;
      // console.log("fodder");
      console.log(this.StatisticsMemberLocal);
      let arr=JSON.parse(JSON.stringify(this.StatisticsMemberLocal!.changes_members));  
          let oldPrice=0 ;
          let newPrice=0 ;
          let changeRate='';
    //  if(this.type == "fodder") {
      if(from != '' || to != ''){
        for(let i = 0 ; i< arr.length ; i++) {
          let changes=[];
          let count=0;

            for(let j = 0 ; j<arr[i].changes.length  ; j++) {              
              if(arr[i].changes[j].date >= from && arr[i].changes[j].date <= to){
                changes[count]=arr[i].changes[j]
                count++;
              }
   
            }

            if(changes.length != 0){//to not crash when no changes occured
              oldPrice = changes[0].price;
              newPrice = changes[count-1].price;
            }
            changeRate = (((newPrice - oldPrice)/newPrice)*100).toFixed(2);

            arr[i].counts = (changes.length)-1;
            arr[i].changes = changes
            arr[i].change=changeRate;

            changes=[];
           }   
      // }
        
      console.log('============');
      
      console.log(arr);

      this.chartOptions=  this.chart.drowShart(arr)
      
      setTimeout(() => {
        this.chartOptions=  this.chart.drowShart(arr)
      }, 500);



      // this.statistics.StatisicsMembersFodder(id,type,from,to,'').subscribe(res => {
        
      //   this.StatisticsMemberLocal=res.data
      //   this.chartOptions=  this.chart.drowShart(res.data!.changes_members)
      //     console.log(this.StatisticsMemberLocal);
        
      //   let members= res.data!.changes_members
      //   let array:any = []
      //   for(let i = 0 ; i< members.length ; i++) {
      //     let is_item_exist= 0

      //     if(i+1 != members.length) {
      //       for (let j = 0; j < array.length; j++) {
      //         if(array[j].find((element:any) => members[i].name == element.name)){
      //           is_item_exist=1
      //         }else{
      //           is_item_exist=0
      //         }
      //       }
      //       if(is_item_exist==0) {
      //         array.push([
      //           {
      //              name:  members[i].name,
      //              categories: members.filter((element:any) => element.name == members[i].name)
      //           }
      //         ])    
      //       }
      //     }
      //   }
      //   this.StatisticsMemberFodder = array

      // })

    }
    else{
      //if choose all
      for(let i = 0 ; i< arr.length ; i++) {
 
        const last = arr[i].changes.at(-1);
          if(arr[i].changes.length != 0){//to not crash when no changes occured
            oldPrice = arr[i].changes[1].price;
            newPrice = last.price;
            console.log(newPrice);
            
          }
          changeRate = (((newPrice - oldPrice)/newPrice)*100).toFixed(2);
          arr[i].counts = (arr[i].changes.length)-1;
          arr[i].change=changeRate;
         }   

      this.chartOptions=  this.chart.drowShart(arr)
      setTimeout(() => {
        this.chartOptions=  this.chart.drowShart(arr)
      }, 500);

    }
      let members= arr
      let array:any = []
      for(let i = 0 ; i< members.length ; i++) {
        let is_item_exist= 0

        if(i+1 != members.length) {
          for (let j = 0; j < array.length; j++) {
            if(array[j].find((element:any) => members[i].name == element.name)){
              is_item_exist=1
            }else{
              is_item_exist=0
            }
          }
          if(is_item_exist==0) {
            array.push([
              {
                 name:  members[i].name,
                 categories: members.filter((element:any) => element.name == members[i].name)
              }
            ])    
          }
        }
      }
      this.StatisticsMemberFodder = array

    // else {
    //   this.statistics.StatisicsMembersLocal(id, type, from, to, '').subscribe(res => {
    //      this.StatisticsMemberLocal=res.data
    //      this.StatisticsMemberSlected = res.data?.changes_members
    //      this.chartOptions=  this.chart.drowShart(res.data!.changes_members)
    //      setTimeout(()=> {
    //       this.StatisticsMemberLocal=res.data
    //       this.StatisticsMemberSlected = res.data?.changes_members
    //       this.chartOptions=  this.chart.drowShart(res.data!.changes_members)
    //      },500)
          

    //  })


    // }

  }

  subtractDays(numOfDays: number, date = new Date()) {
    date.setDate(date.getDate() - numOfDays);
    let shortDate;
    if(date.getMonth() + 1 < 10){
      shortDate = date.getFullYear() + '-0' + (date.getMonth() + 1) + '-' + date.getDate();
    }
    else{
    shortDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    }
    return shortDate;
  }

  geTstatisticsByDate(days: number): void {
    this.days= days
    if (days == 0) {
      this.getStatisticsMemberData(this.id,this.type, '', '');
      return;
    }
    let date = new Date();
    let today;

    if(date.getMonth() + 1 < 10){
      today =date.getFullYear() + '-0' + (date.getMonth() + 1) + '-' + date.getDate();

    }
    else{
      today =date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
    let from = this.subtractDays(days);
    this.getStatisticsMemberData(this.id,this.type ,from, today);
    console.log(today);
    
    console.log(from);
  }
}
