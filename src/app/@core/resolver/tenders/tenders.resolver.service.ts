import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { AllNews } from '@app/@core/interfaces/news/news';
import { TendersService } from '@app/@core/services/modules/tenders/tenders.service';
import { catchError, EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TendersResolver implements Resolve<ApiResponse<AllNews>> {
  constructor(private tendersNews: TendersService ,private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ApiResponse<AllNews>> {
    // console.log("Tenders Resolver is work ",route.paramMap.get('type'))

    return this.tendersNews.all_news(route.paramMap.get('type')||'poultry','','',1).pipe(
      catchError(() => {
        this.router.navigate([""]);
        return EMPTY
      })
    )

  }
}


