import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { sector } from '@app/@core/@data/app/filter-list';
import { Job } from '@app/@core/interfaces/employment/Job';
import { MyJobs } from '@app/@core/interfaces/employment/my-jobs';
import { Sector } from '@app/@core/interfaces/_app/app-response';
import { EmploymentService } from '@app/@core/services/modules/employment/employment.service';
import { ToasterService } from '@app/@core/services/toastr.service';

@Component({
  selector: 'app-your-jobs',
  templateUrl: './your-jobs.component.html',
  styleUrls: ['./your-jobs.component.scss']
})
export class YourJobsComponent implements OnInit {

  public type!:string
  public data?:MyJobs;
  secId?:number
  ////////////
  public page= {last_page: 0, current_page:0}



  constructor(
    private employment: EmploymentService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private router: Router,
    private titleService:Title
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle('وظائفي');
    let url =  this.router.url.split('/') 
    this.type =  url[url.length-2] //get type from url 
    this.secId= sector.find((i:Sector) => i.type ===   url[  url.length-2] )?.id ||1

    this.employment.my_jobs(this.secId,'').subscribe(res => {
      this.toasterService.stopLoading();
      this.data= res.data
      this.page.current_page = res.data?.current_page as number
      this.page.last_page = res.data?.last_page as number
    }, (err) => {
      this.toasterService.stopLoading();
      this.toasterService.showFail(err.error.error)
    })

  }

  next_page(page:number):void{
    this.employment.my_jobs(this.secId || 1 ,page+'').subscribe(res => {
      this.data =res.data
      this.page.current_page = res.data?.current_page as number
      this.page.last_page = res.data?.last_page as number
    })
  }

}
