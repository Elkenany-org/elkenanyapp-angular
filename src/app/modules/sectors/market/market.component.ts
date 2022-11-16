import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { sector } from '@app/@core/@data/app/filter-list';
import { MarketService } from '@app/@core/services/modules/market/market.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit{
  public loading: boolean = true
  id?: any

  constructor(private route: ActivatedRoute,    private location: Location,    private MarketService: MarketService,

    ) {}
  ngOnInit(): void {
    this.route.params.subscribe(parm => {

      // this.MarketService.Filter_list(parm['type']).subscribe( res => {
      //   this.id= res.data?.sectors.find((i:any) => i.selected == 1)!.id
      //   this.location.go(`/market/${this.id}`);
      // })
      // this.id = parm['type']
      // console.log(this.id)
    })


  }
   

      
}
