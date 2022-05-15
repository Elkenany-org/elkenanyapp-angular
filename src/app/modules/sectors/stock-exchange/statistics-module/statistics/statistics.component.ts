import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { StatisticsMember } from '../_core/statistics';
import { StatisticsService } from '../_core/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  StatisticsMember?:StatisticsMember
  constructor(private statistics: StatisticsService,
              private roure: ActivatedRoute) { }

  ngOnInit(): void {
    this.roure.params.subscribe((prm: Params) => {
      prm['id']

      this.statistics.StatisicsMembers('','','','','').subscribe(res => {
        console.log(res)
        this.StatisticsMember=res.data
      })
    })
  }

}
