import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { comparsion_Search_Form_Data } from '@app/@core/@data/app/stock-exchange/comparison';
import { JsonFormData } from '@app/@shared/components/form/cva/cva.component';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { StockExchangeService } from '../_core/stock-exchange.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss']
})
export class ComparisonComponent implements OnInit {


  /////////////////////
  togglecom: boolean = false;
  toggleCat: boolean = false;



  dropdownList:any = [];
  selectedItems:any=[];
  dropdownSettings:IDropdownSettings={};
  dropDownForm!:FormGroup;
  ////////////////////////
  selectedDevice?:any
  public h_search_form: JsonFormData | any 

  constructor(private service:StockExchangeService,private fb: FormBuilder,
    private route: ActivatedRoute ) { }

  ngOnInit(): void {


    ////////////////////////
    this.dropdownList = [
      { item_id: 1, item_text: 'Item1' },
      { item_id: 2, item_text: 'Item2' },
      { item_id: 3, item_text: 'Item3' },
      { item_id: 4, item_text: 'Item4' },
      { item_id: 5, item_text: 'Item5' }
    ];
    this.dropdownSettings = {
      idField: 'item_id',
      textField: 'item_text',
    };
    this.selectedItems = [
      { item_id: 3, item_text: 'Item3'  },
      { item_id: 4,item_text: 'Item4' }
    ];
    this.dropDownForm = this.fb.group({
      myItems: [this.selectedItems]
  });
    //////////////////////////////
    
    this.h_search_form = comparsion_Search_Form_Data

    this.route.params.subscribe( params => { 
      this.service.ComprisonFodder(params['id']).subscribe(res => {
        this.h_search_form.controls.find((i:any) => i.role === "companies").option = res.data?.companies
        this.h_search_form.controls.find((i:any) => i.role === "feeds").option =   res.data?.feeds;
        this.h_search_form.title =   res.data?.stock_name;
      })
    })

   
  }

select(v:any) {
  console.log(v);
  
}


}
