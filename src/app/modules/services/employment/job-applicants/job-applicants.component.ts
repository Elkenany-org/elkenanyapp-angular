import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Applicant, applicants } from '@app/@core/interfaces/employment/applicants';
import { applicants_Search_Form_Data, employment_Search_Form_Data } from '@app/@core/interfaces/employment/employment-home-data';
import { JsonFormData } from '@app/@core/interfaces/_app/horizontal-search';
import { EmploymentService } from '@app/@core/services/modules/employment/employment.service';

@Component({
  selector: 'app-job-applicants',
  templateUrl: './job-applicants.component.html',
  styleUrls: ['./job-applicants.component.scss']
})
export class JobApplicantsComponent implements OnInit {

  public id!:string
  secId?:number
  public applicants?:applicants
  public h_search_form: JsonFormData | any 
  public loading: boolean = true
  public filterData:{[key:string]:string}= {
    qualified:"",
    search:"",
  }
  constructor(private employment:EmploymentService,
    private route: ActivatedRoute,
    private titleService:Title,
    private router: Router,

    ) { }

  ngOnInit(): void {
    this.titleService.setTitle('المتقدمين للوظيفة');

    this.route.params.subscribe(parm => {
      this.id=parm['id']
       this.employment.applicants(this.id,'','').subscribe(
        (res)=>{
          this.applicants = res.data
        }
      )
    })

    this.h_search_form = applicants_Search_Form_Data //set initial data to horizontal component 

    this.route.params.subscribe(params => {
      this.employment.Filter_applicants().subscribe( res => {
        this.h_search_form.controls.find((i:any) => i.role === "qualified").option =   res.data?.qualified;
        this.h_search_form.controls.find((i:any) => i.role === "qualified").option.find((i:any) => i.id == 0).selected=1
        this.h_search_form.controls.find((i:any) => i.role === "qualified").option.find((i:any) => i.id !== 0).selected=0
            this.h_search_form.title='المتقدمين لوظيفة '+ this.applicants?.job_title
      })


  })
}

filter(value:any) {
  this.route.params.subscribe( params => {
    switch ( value.type ) {
      case "qualified":
        if(value.id == 0){
          this.filterData['qualified']=''
        }else{
            this.filterData['qualified'] = value.id 
        }
        break;
      case "search":
          this.filterData['search'] = value.name      
        break;
      default: 
          // 
          break;
   }

  })
  this.employment.applicants(this.id,this.filterData['qualified'],this.filterData['search']).subscribe(res => {
    this.applicants = res.data
  })

}

}
