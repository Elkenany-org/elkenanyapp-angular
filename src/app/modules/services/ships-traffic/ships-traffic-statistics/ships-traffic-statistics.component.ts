import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ship_traffic_Statistics_Search_Form, StatisticsShips } from '@app/@core/interfaces/ships-traffic/ships-traffic';
import { JsonFormData } from '@app/@core/interfaces/_app/filter-list';
import { BannersLogoservice } from '@app/@core/services/Banners-logos.service';
import { ShipsTrafficService } from '../_core/services/ships-traffic.service';
import { Fillter } from '@shared/classes/filter';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ships-traffic-statistics',
  templateUrl: './ships-traffic-statistics.component.html',
  styleUrls: ['./ships-traffic-statistics.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class ShipsTrafficStatisticsComponent implements OnInit {
  public data?:StatisticsShips
  // public originandSortsForm!:FormGroup
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


   fillter =   new Fillter()

  public h_search_form?:JsonFormData  
  constructor( 
               private route:ActivatedRoute,
               private fb:FormBuilder,
               private BannerLogoService:BannersLogoservice,
               private ship: ShipsTrafficService,) {   
                  // Object.assign(this, { single });
              }

  ngOnInit(): void {

    // this.originandSortsForm = this.fb.group({
    //   origin:'',
    //   sort: '',
    // })
    this.h_search_form = ship_traffic_Statistics_Search_Form
    this.route.data.subscribe(data => {
      this.data= data['resolve'].data
      console.log(data['resolve'].data)

      this.data?.products.forEach(item => this.chart.push({name:item.name,value:item.load}))
      this.single =this.chart;

    })

  }

  filter(value:any):void {
    console.log(value)
     this.fillter.filter(value)
     let f = this.fillter.filterdata
     console.log(this.fillter.filterdata );

    this.ship.Statistics(f['sort'],f['from'],f['to'], f['country_id']).subscribe(res => {
      this.data = res.data
      console.log(res);
      
    })
    
  }

  onSelect(data:any): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }


  product(name:string):string {

   let t = this.data?.products.find(i => i.name == name)?.id+''
    return t
  }
}
