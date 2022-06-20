import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { AllNews } from '@app/@core/interfaces/news/news';


import { catchError, EMPTY, Observable } from 'rxjs';

import { NewsService } from '../../services/modules/news/news.service';


@Injectable({
  providedIn: 'root'
})
export class NewsHomeResolver implements Resolve<ApiResponse<AllNews>>{
   

  constructor(private News: NewsService ,private router: Router) { }

  resolve(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot):Observable<ApiResponse<AllNews>>  {
    console.log("News Resolver is work ",route.paramMap.get('type'))
   return this.News.all_news(route.paramMap.get('type')||'',1,'',1).pipe(
     catchError(() => {
       this.router.navigate([""]);
       return EMPTY
     })
   )
  }
 
 
}
