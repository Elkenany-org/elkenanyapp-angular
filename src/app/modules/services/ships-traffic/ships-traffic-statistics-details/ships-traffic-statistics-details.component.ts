import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { JsonFormData } from '@app/@core/interfaces/_app/filter-list';
import { ship_traffic_Statistics_Search_Form } from '@core/interfaces/ships-traffic/ships-traffic';
import { BannersLogoservice } from '@app/@core/services/Banners-logos.service';
import { ShipsTrafficService } from '../../../../@core/services/modules/ships-trafic/ships-traffic.service';
import { ActivatedRoute  } from '@angular/router';
import { StatisticsDetials } from '@core/interfaces/ships-traffic/ships-traffic';
import { Fillter } from '@shared/classes/filter';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';

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
  country=''
    open:boolean= false
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
  constructor(
    private BannerLogoService:BannersLogoservice,
    private fb:FormBuilder,
    private route:ActivatedRoute,
    private ship: ShipsTrafficService,
    private titleService:Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('تفاصيل حركة السفن');

    this.fromToForm= this.fb.group({
      country: [],
      from: [],
      to:[]
    })
    this.h_search_form = ship_traffic_Statistics_Search_Form
    this.route.params.subscribe(prm => {
      this.id= prm['id']
      this.country = prm['country']

    })
    this.route.data.subscribe(res => {
      this.data = res['resolve'].data// data.data
      console.log(this.data);
      
      this.data?.ships_charts.forEach(item => this.chart?.push({name:item.product,value:item.load}))
      this.single =this.chart;
    })
  }

  filter(value:any,type:string):void { //type come from small screen

    
    if(type){ //this  condation works only  at small view port screen
          let f = this.fromToForm.controls 

          // console.log(f['from'].value)
          // console.log(this.country)

      this.ship.StatisticsDetails(f['from'].value,f['to'].value,this.country,this.id).subscribe(res => {
        this.data = res.data
      })
   
    }else{
      let f = this.fillter.filterdata
      this.fillter.filter(value)
      // console.log(f)
      this.country = f['country_id']

      this.ship.StatisticsDetails(f['from'],f['to'],f['country_id'],this.id).subscribe(res => {
        this.data = res.data
      })
    }
  
  }
  toggle(){
    this.open= !this.open
  }

}
