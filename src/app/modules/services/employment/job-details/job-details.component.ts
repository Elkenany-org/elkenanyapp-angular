import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { JobDetails } from '@app/@core/interfaces/employment/job-details';
import { EmploymentService } from '@app/@core/services/modules/employment/employment.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
  public jobDetails?: JobDetails;
  public loading: boolean=false

  message='';

  constructor(
    private route: ActivatedRoute,
    private job: EmploymentService,
    private router: Router,

    private titleService:Title
    ) { }

  ngOnInit(): void {

    this.route.data.subscribe(data => {
      this.jobDetails = data['resolve'].data    
      this.titleService.setTitle(this.jobDetails?.title!);

    })

  }



}
