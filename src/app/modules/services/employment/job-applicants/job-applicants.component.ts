import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Applicant, applicants } from '@app/@core/interfaces/employment/applicants';
import { EmploymentService } from '@app/@core/services/modules/employment/employment.service';

@Component({
  selector: 'app-job-applicants',
  templateUrl: './job-applicants.component.html',
  styleUrls: ['./job-applicants.component.scss']
})
export class JobApplicantsComponent implements OnInit {

  public id!:string
  secId?:number
  applicants?:applicants

  constructor(private employment:EmploymentService,
    private route: ActivatedRoute,
    private titleService:Title,
    private router: Router,

    ) { }

  ngOnInit(): void {
    this.titleService.setTitle('المتقدمين للوظيفة');

    this.route.params.subscribe(parm => {
      this.id=parm['id']
       console.log(this.id)
       this.employment.applicants(this.id).subscribe(
        (res)=>{
          this.applicants = res.data
          console.log('====================================');
          console.log(this.applicants);
          console.log('====================================');
        }
      )
    })



  }

}
