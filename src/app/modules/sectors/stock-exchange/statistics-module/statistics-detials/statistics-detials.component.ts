import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../_core/statistics.service';
import { ActivatedRoute } from '@angular/router';
// import { StatisicsStocksDetials } from './../_core/statistics';
import { StatisicsStocksDetials } from '@core/interfaces/stock-exchanges/statistics';

@Component({
  selector: 'app-statistics-detials',
  templateUrl: './statistics-detials.component.html',
  styleUrls: ['./statistics-detials.component.scss']
})
export class StatisticsDetialsComponent implements OnInit {
  data?: StatisicsStocksDetials
  constructor(private statistics: StatisticsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(prm => {
      this.statistics.StatisicsStocksDetials(prm['id']).subscribe(res => {
        console.log(res);

        this.data= res.data
      })      
    })
    
  }

}
