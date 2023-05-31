import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { company } from '@app/@core/interfaces/companies-guid/co-company';
import { CompaniesGuideService } from '../../../../@core/services/modules/companies-guide/companies-guide.service';

interface Tab {
  title: string;
  content: TemplateRef<any> | null; // Adjusted type to allow TemplateRef or null
}

@Component({
  selector: 'app-companies-details',
  templateUrl: './companies-details.component.html',
  styleUrls: ['./companies-details.component.scss']
})
export class CompaniesDetailsComponent implements OnInit {
public company?:company
public addRate!: FormGroup
public rateValue:number=0
tabs : Tab[]= [
  { title: 'Tab 1', content: null },
  { title: 'Tab 2', content: null },
  { title: 'Tab 3', content: null },
  { title: 'Tab 4', content: null }
];
@ViewChild('about') about!: TemplateRef<any>;
@ViewChild('stock') stock!: TemplateRef<any>;
@ViewChild('gallery') gallery!: TemplateRef<any>;
@ViewChild('info') info!: TemplateRef<any>;

activeTab: number = 0;
currentTab: any;

constructor(
    private companiesGuideService: CompaniesGuideService,
    private route: ActivatedRoute,
   private router: Router, private fb:FormBuilder,
   private titleService:Title
  ) { }

  ngAfterViewInit() {
    this.tabs[0].content = this.about;
    this.tabs[1].content = this.stock;
    this.tabs[2].content = this.gallery;
    this.tabs[3].content = this.info;

    this.currentTab = this.tabs[0];
  }
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
        this.router.navigate([`/البورصة/${params['type']}/${type}/${id}`])
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

    changeTab(tabIndex: number) {
      this.activeTab = tabIndex;
      this.currentTab = this.tabs[tabIndex];
    }
    
}


