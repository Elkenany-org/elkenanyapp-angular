import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { sector } from '@app/@core/@data/app/filter-list';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit{
  public loading: boolean = true
  id?: number

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe(parm => {
      
      this.id = sector.find(i => i.type ==  parm['type'])?.id
      console.log(this.id)
    })
  }
   

      
}
