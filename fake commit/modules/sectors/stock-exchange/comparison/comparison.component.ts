import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { comparsion_Search_Form_Data } from '@app/@core/@data/app/stock-exchange/comparison';
import { JsonFormData } from '@app/@shared/components/form/cva/cva.component';
import { StockExchangeService } from '../_core/stock-exchange.service';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss']
})
export class ComparisonComponent implements OnInit {
  public h_search_form: JsonFormData | any 

  constructor(private service:StockExchangeService,
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.h_search_form = comparsion_Search_Form_Data

    this.route.params.subscribe( params => { 
      this.service.ComprisonFodder(params['id']).subscribe(res => {
        this.h_search_form.controls.find((i:any) => i.role === "companies").option = res.data?.companies
        this.h_search_form.controls.find((i:any) => i.role === "feeds").option =   res.data?.feeds;
        this.h_search_form.title =   res.data?.stock_name;
      })
    })

   
  }



  select(item:string) {

  }
}
