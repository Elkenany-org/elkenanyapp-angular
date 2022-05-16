import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { company } from '@app/@core/interfaces/companies-guid/co-company';
import { CompaniesGuideService } from '../_core/services/companies-guide.service';

@Component({
  selector: 'app-companies-details',
  templateUrl: './companies-details.component.html',
  styleUrls: ['./companies-details.component.scss']
})
export class CompaniesDetailsComponent implements OnInit {
public company?:company
  constructor(
    private companiesGuideService: CompaniesGuideService,
    private route: ActivatedRoute,
    private router: Router, 

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
       

      this.companiesGuideService.comapny(params['id']).subscribe(res => {
        console.log(res)
        this.company= res.data
  
      })
    })


  }

}
