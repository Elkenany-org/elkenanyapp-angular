import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { StatisticsService } from '../_core/statistics.service';
import { StatisticsSubsSections, Statistics_Search_Form, StatisticsMembersLocal, ChangesMember, ListMember, StatisticsListLocal } from '@core/interfaces/stock-exchanges/statistics';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Fillter } from '@app/@shared/classes/filter';
import { StatisticsChart } from '@shared/classes/drowShart.class';
import { filter } from 'rxjs/operators';
import { StockExchangeComponent } from '../../stock-exchange/stock-exchange.component';
import { Title } from '@angular/platform-browser';
import { data } from '@app/@core/interfaces/ships-traffic/ships-traffic';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics-members.component.html',
  styleUrls: ['./statistics-members.component.scss']
})
export class StatisticsMembersComponent implements OnInit {


  StatisticsMemberGlobal?:StatisticsMembersLocal

  StatisticsMemberLocal?:StatisticsMembersLocal

  StatisticsListLocal?:StatisticsListLocal

  StatisticsMemberSlected? :ChangesMember[]
  ///
  StatisticsMemberFodder:any

  fromToForm!:FormGroup
  h_search_form:any
  type!:string
  id: string = ''
  stockId: string = ''

  // fodderId: string = ''

  fillter= new Fillter()
  chart  = new StatisticsChart()
	chartOptions :any
  message:boolean=false;

  products?:any;
  days:number=0
  constructor(private statistics: StatisticsService,
              private roure: ActivatedRoute,
              private fb:FormBuilder,
              private titleService :Title,
              private router: Router,

              ) {}

  ngOnInit(): void {


    this.h_search_form = Statistics_Search_Form
    this.h_search_form.title=' احصائيات '+localStorage.getItem('title')
    this.titleService.setTitle(this.h_search_form.title);

    this.fromToForm= this.fb.group({
      // country: [],
      from: [],
      to:[]
    })

    this.roure.params.subscribe((prm: Params) => {
    this.stockId=  prm['id']//get type from url
    this.type= prm['type']



    this.roure.data.subscribe(data => {
      
      // console.log(data['resolve']);
      if(this.type == "fodder"){
        this.message=true;
         console.log(data['resolve'].data);
        this.StatisticsMemberLocal=data['resolve'].data
        this.StatisticsListLocal=data['resolve'].data
        // this.chartOptions=  this.chart.drowShart(data['resolve'].data!.changes_members)
     
        // this.StatisticsMemberFodder =this.fodderTable(data['resolve'].data!.changes_members)
        
      //     this.statistics.StatisicsListFodder(this.stockId).subscribe(res => {
      //     console.log('====================================');
      //     console.log(res.data?.list_members);
      //     console.log('====================================');
      //     // this.StatisticsMemberFodder=res.data
      //     // this.StatisticsMemberLocal=res.data
      //     this.StatisticsListLocal=res.data
      //    console.log(this.StatisticsListLocal)
      //    let temp= parseInt(localStorage.getItem('stockId')!)
      //    this.products = this.StatisticsMemberLocal?.changes_members.filter(i => i.compId == temp) as ChangesMember[]

      //  let name= this.StatisticsListLocal?.list_members.find((i: { id: any; }) => i.id == localStorage.getItem('stockId'))!.name
      //    document.getElementById('company')!.innerText = ''+name;

      // })
  

      }else if (this.type == "local"){
        this.StatisticsMemberLocal=data['resolve'].data

        this.StatisticsMemberSlected = data['resolve'].data?.changes_members
        this.chartOptions=  this.chart.drowShart(data['resolve'].data!.changes_members)
        // console.log(this.StatisticsMemberLocal);

      }


    })


    
    // this.getStatisticsMemberData(this.id,this.type,'','')
    })

    // if(this.type == "fodder"){
    //     this.statistics.StatisicsMembersFodder(this.id,this.type,'','','').subscribe(res => {
        
    //          this.StatisticsMemberLocal=res.data
    //          this.StatisticsMemberFodder =this.fodderTable(res.data!.changes_members)

    //         })
    //       }
  }
flag:boolean=false;
  selectFodderStock(id:any) {
    this.days=0
    if(id>0) {
      this.id = id
      // this.StatisticsMemberSlected = [this.StatisticsMemberLocal?.changes_members.find(i => i.id ==id)] as ChangesMember[]
      this.chartOptions=  this.chart.drowShart( [this.StatisticsMemberLocal?.changes_members.find(i => i.id ==id)])
      this.flag=true
      // this.products=this.StatisticsMemberLocal?.changes_members

    }else if(id==-1){//all from الاصناف
      this.id = id
      let productAll=JSON.parse(JSON.stringify(this.products));  
      productAll.shift();
      this.chartOptions=  this.chart.drowShart( productAll)
      this.flag=true

    }
    else {
      this.id = ''
      // this.StatisticsMemberSlected =this.StatisticsMemberLocal?.changes_members as ChangesMember[]
      this.chartOptions=  this.chart.drowShart( this.StatisticsMemberLocal?.changes_members)
       this.products=[]
      this.flag=false
    }
    this.getStatisticsMemberData(id,this.type, '', '');
    let name=this.StatisticsMemberLocal?.changes_members.find(i => i.id == id)?.categorize
    // console.log(name + id);
    
    if(name==undefined){
      name='الكل'
    }      
    if(id == 0){
        document.getElementById('company')!.innerText = name;
    }
      document.getElementById('product')!.innerText = ''+name;

  }

  selectLocalStock(id:any) {

    this.days=0

    if(id>0) {
     this.id = id
    this.products = this.StatisticsMemberLocal?.changes_members.filter(i => i.id == id) as ChangesMember[]
    // console.log(this.products);
      this.StatisticsMemberSlected = [this.StatisticsMemberLocal?.changes_members.find(i => i.id ==id)] as ChangesMember[]
      this.chartOptions=  this.chart.drowShart( [this.StatisticsMemberLocal?.changes_members.find(i => i.id ==id)])
      this.products.unshift({id:-1,categorize:'الكل'});
      this.flag=true
    }else{//all from الاصناف
      this.id = ''
      this.StatisticsMemberSlected = this.StatisticsMemberLocal?.changes_members;
      this.chartOptions=  this.chart.drowShart( this.StatisticsMemberLocal?.changes_members)
      this.flag=false
    }


    let name=this.StatisticsMemberLocal?.changes_members.find(i => i.id == id)?.name
    if(name==undefined){
      name='الكل'
    }
      document.getElementById('local')!.innerText = ''+name;

    }



  selectCompany(id:any) {
    this.message=false

    this.days=0
     this.id = '-1'
      // this.products = this.StatisticsMemberLocal?.changes_members.filter(i => i.compId == id) as ChangesMember[]

      // this.products.unshift({id:-1,categorize:'الكل'});
      // console.log(this.products);
    //  this.flag=true
      // this.getStatisticsMemberData(-1,this.type, '', '');


  this.statistics.StatisicsMembersFodder(this.stockId,this.type,'','',id,'').subscribe(res => {

document.getElementById('product')!.innerText = 'الكل';

            this.StatisticsMemberLocal=res.data
             this.chartOptions=  this.chart.drowShart(res.data!.changes_members)
             this.StatisticsMemberFodder =this.fodderTable(res.data!.changes_members)

             this.products = this.StatisticsMemberLocal?.changes_members.filter(i => i.compId == id) as ChangesMember[]
            //  this.products.unshift({id:-1,categorize:'الكل'});
            let name=this.products.find((i: { compId: any; }) => i.compId == id)?.name
              document.getElementById('company')!.innerText = ''+name;

            })
  }

  selectAllStock(){

          if(this.products){
            this.chartOptions=  this.chart.drowShart( this.products)
          }

  }

  filter(value:any,type:string):void { //type come from small screen

    if(type){ //this  condation works only  at small view port screen
       let f = this.fromToForm.controls
      //  console.log(this.id,this.type,f['from'].value,f['to'].value);

      //  this.getStatisticsMemberData(this.id,this.type,f['from'].value,f['to'].value)
     }else{
       let f = this.fillter.filterdata
        
       this.fillter.filter(value)
      // console.log(this.id,this.type,f['from'],f['to']);
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

  
  getStatisticsMemberData(id:any,type:string,from:string, to:string){
    let arr:any=[];
     let arr2=[{id: 77, name: 'عبد السلام حجازي', categorize: 'ابيض', compId: 131, changes: [{date: '2022-05-28', price: 15}],counts: 0}];

      // console.log(this.id);
      // console.log(this.StatisticsMemberLocal);

      if(id>0 && this.flag && this.products) {
        arr[0]=JSON.parse(JSON.stringify(this.products.find((i: { id: any; }) => i.id ==id))) as ChangesMember[];  
 
      }else if((id==-1 && this.flag) && this.products){//all from الاصناف
        let productAll=JSON.parse(JSON.stringify(this.products));  
        productAll.shift();
        arr=productAll;  

      }
      else{
        arr=JSON.parse(JSON.stringify(this.StatisticsMemberLocal!.changes_members)); 

      }
      
          let oldPrice=0 ;
          let newPrice=0 ;
          let changeRate='0';
          let subone=0;
    //  if(this.type == "fodder") {
    
    if(from != '' || to != ''){
        for(let i = 0 ; i< arr.length ; i++) {
          let changes=[];
          let count=0;
          let countFrom=0;
          let countTo=0;

          //handle if from date is not exist it get the value of last date before this from date and set its price
            let f= arr[i].changes.find((obj:any) => {
                return obj.date === from;
            });
            let oldFrom=new Date(from)
            while(f == undefined ){
              let newFrom=this.subtractDays(1,oldFrom)
              f = arr[i].changes.find((obj:any) => {
                return obj.date === newFrom;
             });
             countFrom++;
             if(countFrom == 100){
                 break;}
             else if(f != undefined){
               f.date=from 
              //  addone=1
             }
           }

          //handle if to date is not exist it get the value of last date after this to date and set its price
        //   let t= arr[i].changes.find((obj:any) => {
        //       return obj.date === to;
        //   });

        //   let oldTo=new Date(to)
        //   while(t == undefined ){
        //     let newTo=this.subtractDays(1,oldTo)
        //     t = arr[i].changes.find((obj:any) => {
        //       return obj.date === newTo;
        //    });
        //    countTo++;
        //    if(countTo == 100){
        //        break;}
        //    else if(t != undefined){
        //     //  t.date=to 
        //      let newobj=JSON.parse(JSON.stringify(t));
        //      newobj.date=to
        //      arr[i].changes.push(newobj);
        //      subone=1
        //    }
        //  }

            for(let j = 0 ; j<arr[i].changes.length  ; j++) {    

              if((arr[i].changes[j].date >= from && arr[i].changes[j].date <= to) && arr[i].changes[j].price != 0){
                changes[count]=arr[i].changes[j]
                count++;
              }
              
            }

            if(changes.length != 0){//to not crash when no changes occured
              oldPrice = changes[0].price;
              newPrice = changes[count-1].price;
              changeRate = (((newPrice - oldPrice)/newPrice)*100).toFixed(2);
              arr[i].counts = (changes.length)-1-subone;
            }else{
              arr[i].counts = 0;
            }
            
            arr[i].changes = changes
            arr[i].change=changeRate;

            changes=[];
           } 
           arr2=arr.filter((i: { changes: any[]; })=>i.changes.length != 0)  
      // }
        
      console.log('============');
      
     console.log(arr2);

      this.chartOptions=  this.chart.drowShart(arr2)
      
      setTimeout(() => {
        this.chartOptions=  this.chart.drowShart(arr2)
      }, 100);



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

        let changes=[];
        let count=0;
        for(let j = 0 ; j<arr[i].changes.length ; j++) {              
          if(arr[i].changes[j].price != 0){
            changes[count]=arr[i].changes[j]
            count++;
          }
        }
        arr[i].changes = changes

        const last = arr[i].changes.at(-1);
  
          if(arr[i].changes.length != 0){//to not crash when no changes occured
            oldPrice = arr[i].changes[0].price;
            newPrice = last.price;
          }
          changeRate = (((newPrice - oldPrice)/newPrice)*100).toFixed(2);
          arr[i].counts = (arr[i].changes.length)-1;
          arr[i].change=changeRate;
         }   

        arr2=arr.filter((i: { changes: any[]; })=>i.changes.length != 0)  
      this.chartOptions=  this.chart.drowShart(arr2)
      setTimeout(() => {
        this.chartOptions=  this.chart.drowShart(arr2)
      }, 100);

    }
      let members= arr
      let array:any = []
      for(let i = 0 ; i< members.length ; i++) {
        let is_item_exist= 0

        
        if(this.type=='fodder'){
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
                this.StatisticsMemberFodder = array
        }
        else{
          this.StatisticsMemberSlected=arr
        }
        // else if(i+1 == members.length){

        //     array.push([
        //       {
        //          name:  members[i].name,
        //          categories: members.filter((element:any) => element.name == members[i].name)
        //       }
        //     ])    
          
        // }
      }


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

  incrementDays(numOfDays: number, date = new Date()) {
    date.setDate(date.getDate() + numOfDays);
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
    // console.log(this.id);
    
    // console.log(from);
  }

  navigatetodetails(type:any,id:any,categorize:string){
    this.router.navigate([`/stock-exchange/no/statistics/statistics-detials/${type}/${id}`])
    localStorage.setItem('type',categorize);
  }
}
