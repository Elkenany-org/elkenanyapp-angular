import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StatisticsMember, StatisticsSubsSections } from '../_core/statistics';
import { StatisticsService } from '../_core/statistics.service';
import { sector } from './../../../../../@core/@data/app/filter-list';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  StatisticsMember?:StatisticsSubsSections

  type!:string
  id!: string
  constructor(private statistics: StatisticsService,
              private roure: ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    let url =  this.router.url.split('/') 
    this.type =  url[url.length-2] //get type from url 
    this.id = sector.find(i => i.type == this.type)?.id+''

    console.log(this.type)

    this.roure.params.subscribe((prm: Params) => {

      this.statistics.StatisicsSubSections(this.type,'','','').subscribe(res => {
        console.log(res)
        this.StatisticsMember=res.data
      })
    })
  }

}
