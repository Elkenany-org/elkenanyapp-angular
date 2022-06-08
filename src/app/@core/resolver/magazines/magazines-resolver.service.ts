import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { catchError, EMPTY, Observable } from 'rxjs';
import { MagazineService } from '@app/@core/services/modules/magazine/magazine.service';
import { Magazine } from '@app/@core/interfaces/magazine/magazine';


@Injectable({
  providedIn: 'root'
})
export class MagazineDetailsResolver implements Resolve<ApiResponse<Magazine>>{
   

  constructor(private magazine: MagazineService ,private router: Router) { }

  resolve(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot):  Observable<ApiResponse<Magazine>>  {
    console.log("resolver is work ",route.paramMap.get('id'))
    let id:any =route.paramMap.get('id')
   return this.magazine.magazine(id).pipe(
     
     catchError(() => {
       this.router.navigate([""]);
       return EMPTY
     })
   )
  }
 
 
}
