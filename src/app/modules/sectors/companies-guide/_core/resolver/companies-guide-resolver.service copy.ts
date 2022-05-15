import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { sector } from '@app/@core/@data/app/filter-list';
import { Companies } from '@app/@core/interfaces/companies-guid/co-companies';
import { ToasterService } from '@app/@shared/services/toastr.service';


import { catchError, EMPTY, Observable } from 'rxjs';
import { CompaniesGuideService } from '../services/companies-guide.service';

@Injectable({
  providedIn: 'root'
})
export class CompaniesGuideResolver implements Resolve<ApiResponse<Companies>>{
   

  constructor(private stock: CompaniesGuideService ,private router: Router,private toster:ToasterService) { }

  resolve(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot):Observable<ApiResponse<Companies>>  {
    console.log("Companies Guide Resolver is work ",route.paramMap.get('id'))
    let  data = {
      section_id: sector.find(i => i.type ==  route.paramMap.get('type'))?.id+'' ||'',
      sub_id:  route.paramMap.get('id')|| ' ',
      sort:"1",
      country_id:"1",
      city_id:"1",
      search: "",
      page:'1'
    }

    this.toster.loading('جاري التحميل')

   return this.stock.Companiesv2(data).pipe(
     catchError(() => {
       this.router.navigate([""]);
       return EMPTY
     })
   )
  }
 
 
}
