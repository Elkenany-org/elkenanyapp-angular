import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { comparsion_Search_Form_Data } from '@app/@core/@data/app/stock-exchange/comparison';
import { StockExchangeService } from '../../../../@core/services/modules/stock-exchange/stock-exchange.service';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Comparison, Compare } from '@app/@core/interfaces/stock-exchanges/conversion';
import { JsonFormData } from '@app/@core/interfaces/_app/horizontal-search';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss']
})
export class ComparisonComponent implements OnInit {

  comparisonData?:Comparison
  comparedData?:Compare
  /////////////////////
  togglecom: boolean = false;
  toggleCat: boolean = false;
  formCommapny: FormGroup;
  formFeeds: FormGroup;


  //







  ////////////////////////
  
  public h_search_form: JsonFormData | any 

  constructor(private StockService:StockExchangeService,private fb: FormBuilder,
    private route: ActivatedRoute ) { 

      this.formCommapny = this.fb.group({
        checkArray: this.fb.array([])
      })

      this.formFeeds = this.fb.group({
        checkArray: this.fb.array([])
      })
    }

  ngOnInit(): void {



    this.h_search_form = comparsion_Search_Form_Data

    this.route.params.subscribe( params => { 
      this.StockService.ComprisonFodder(params['id']).subscribe(res => {
        this.comparisonData= res.data

        this.h_search_form.controls.find((i:any) => i.role === "companies").option = res.data?.companies
        this.h_search_form.controls.find((i:any) => i.role === "feeds").option =   res.data?.feeds;
        this.h_search_form.title =   res.data?.stock_name;
      })
    })

   
  }

select(v:any) {
  console.log(v);
  
}




onCheckComany(e:any) {
  const checkArray: FormArray = this.formCommapny.get('checkArray') as FormArray;
  if (e.target.checked) {
    checkArray.push(new FormControl(e.target.value));
  } else {
    let i: number = 0;
    checkArray.controls.forEach((item: any) => {
      if (item.value == e.target.value) {
        checkArray.removeAt(i);
        return;
      }
      i++;
    });
  }
}

onCheckFeeds(e:any) {
  const checkArray: FormArray = this.formFeeds.get('checkArray') as FormArray;
  if (e.target.checked) {
    checkArray.push(new FormControl(e.target.value));
  } else {
    let i: number = 0;
    checkArray.controls.forEach((item: any) => {
      if (item.value == e.target.value) {
        checkArray.removeAt(i);
        return;
      }
      i++;
    });
  }
}

submitForm() {

  this.togglecom= false;
  this.toggleCat= false;

  let test= (l:any, ) => {}
  this.StockService.compare( {companies_id:this.formCommapny.value.checkArray, fodder_items_id: this.formFeeds.value.checkArray}).subscribe(res => {
    this.comparedData= res.data
    console.log(res);
    
  })

  
}

findCompanies(v:number):number {
  // console.log(this.formCommapny.value.checkArray.find((i:string) => i == v));
  return this.formCommapny.value.checkArray.find((i:number) => i == v)
}


// findFeeds(v:number):number {
//   // console.log(this.formFeeds.value.checkArray.find((i:string) => i == v));
//   return this.formFeeds.value.checkArray.find((i:number) => i == v)
// }

}
