import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { AllNews, allSections } from '@app/@core/interfaces/news/news';
import { TendersService } from '@app/@core/services/modules/tenders/tenders.service';
import { catchError, EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TendersHomeResolver implements Resolve<ApiResponse<allSections>> {
  constructor(private tendersSections: TendersService ,private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ApiResponse<allSections>> {
   console.log("Tenders Resolver is work ")

    return this.tendersSections.all_sections('','').pipe(
      catchError(() => {
        this.router.navigate([""]);
        return EMPTY
      })
    )

  }
}


