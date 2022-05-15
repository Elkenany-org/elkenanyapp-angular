import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { JsonFormData } from '@app/@core/interfaces/_app/filter-list';
import { ToasterService } from '@app/@shared/services/toastr.service';
import { ship_traffic_Statistics_Search_Form } from '@core/interfaces/ships-traffic/ships-traffic';
import { single } from './../_core/services/data';
import { BannersLogoservice } from '@app/@core/services/Banners-logos.service';
import { ShipsTrafficService } from '../_core/services/ships-traffic.service';
import { ActivatedRoute, Data } from '@angular/router';
import { StatisticsDetials,data } from '@core/interfaces/ships-traffic/ships-traffic';
import { map } from 'rxjs';
import { Fillter } from '@shared/classes/filter';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ships-traffic-statistics-details',
  templateUrl: './ships-traffic-statistics-details.component.html',
  styleUrls: ['./ships-traffic-statistics-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShipsTrafficStatisticsDetailsComponent implements OnInit {
  public data?:StatisticsDetials
  public id:number = 0
  public h_search_form?:JsonFormData
  fillter =   new Fillter()
  fromToForm!:FormGroup
  single?: any[];
  view: any[] = [700, 400];
  chart:{name: string,value: number} [] =[]
  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  constructor(private toster:ToasterService,
    private BannerLogoService:BannersLogoservice,
    private fb:FormBuilder,
    private route:ActivatedRoute,
    private ship: ShipsTrafficService) { }

  ngOnInit(): void {
    this.fromToForm= this.fb.group({
      from: [],
      to:[]
    })
    this.h_search_form = ship_traffic_Statistics_Search_Form
    this.route.params.subscribe(prm => this.id= prm['id'])
    this.route.data.subscribe(res => {
      this.data = res['resolve'].data// data.data
      this.toster.stopLoading()
      
      this.data?.ships_charts.forEach(item => this.chart?.push({name:item.product,value:item.load}))
      this.single =this.chart;
    })
  }

  filter(value:any,type:string):void { //type come from small screen
    if(type){
      console.log(this.fromToForm.controls['to'].value);  
      console.log(this.fromToForm.controls['from'].value);  
      this.ship.StatisticsDetails(this.fromToForm.controls['from'].value,this.fromToForm.controls['to'].value,'',this.id).subscribe(res => {
        console.log(res)
      })
   
    }else{
      this.toster.loading('حاري التحميل')
      this.fillter.filter(value)
      this.ship.StatisticsDetails(this.fillter.filterdata['from'],this.fillter.filterdata['to'],'',263).subscribe(res => {
        this.data = res.data
        console.log(res);
        this.toster.stopLoading()
      })
    }
  
  }
  

}
