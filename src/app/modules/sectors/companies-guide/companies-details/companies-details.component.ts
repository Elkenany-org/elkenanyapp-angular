import { Component, OnInit } from '@angular/core';
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
  constructor(
   // private companiesGuideService: CompaniesGuideService,
    private route: ActivatedRoute,
   private router: Router, 

  ) { }

  ngOnInit(): void {

    this.route.data.subscribe(data => {
      this.company = data['resolve'].data 
    })

console.log(this.company);

  }

    navigateV2(id: number, type:string): void
    {
      this.route.params.subscribe( params => 
        this.router.navigate([`/stock-exchange/${params['type']}/stock-exchange/${params['type']}/${type}/${id}`])
        )
        
       
    }

}


