import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { company } from '@app/@core/interfaces/companies-guid/co-company';
import { CompaniesGuideService } from '../../../../@core/services/modules/companies-guide/companies-guide.service';

@Component({
  selector: 'app-companies-details',
  templateUrl: './companies-details.component.html',
  styleUrls: ['./companies-details.component.scss']
})
export class CompaniesDetailsComponent implements OnInit {
public company?:company
public addRate!: FormGroup
public rateValue:number=0

constructor(
    private companiesGuideService: CompaniesGuideService,
    private route: ActivatedRoute,
   private router: Router, private fb:FormBuilder,
   private titleService:Title
  ) { }

  ngOnInit(): void {

    this.route.data.subscribe(data => {
      this.company = data['resolve'].data 
    })
    this.titleService.setTitle(' تفاصيل '+this.company?.name);

// console.log(this.company);
this.addRate =this.fb.group({
  rate: ['', [Validators.required]],
})
  }

    navigateV2(id: number, type:string): void
    {
      this.route.params.subscribe( params => 
        this.router.navigate([`/stock-exchange/${params['type']}/${type}/${id}`])
        )

    }


    sendRate() {
      this.rateValue=this.addRate.controls['rate'].value
      let body ={company_id:this.company?.id+'' , reat:this.addRate.controls['rate'].value}
      this.companiesGuideService.rate(body).subscribe(
      (res) => {

        document.getElementById('msg-rate')!.style.display="block";

      },
      (err)=>{
        document.getElementById('msg-auth')!.style.display="block";
      }
      )
    }
  
}


