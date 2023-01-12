import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ShipsTrafficService } from '../../services/modules/ships-trafic/ships-traffic.service';
import { Ships } from '@app/@core/interfaces/ships-traffic/ships-traffic';
import {  Magazines } from './../../interfaces/magazine/magazine';
import { MagazineService } from '../../services/modules/magazine/magazine.service';


@Injectable({
  providedIn: 'root'
})
export class MagazineResolver implements Resolve<ApiResponse<Magazines>>{
   

  constructor(private magazine: MagazineService ,private router: Router) { }

  resolve(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot):  Observable<ApiResponse<Magazines>>  {
    console.log("resolver is work ")
    let type = route.paramMap.get('type')|| ''

   return this.magazine.magazines(type,route.queryParamMap.get('sort')+'','','','',route.queryParamMap.get('page')+'').pipe(
     
     catchError(() => {
       this.router.navigate([""]);
       return EMPTY
     })
   )
  }
 
 
}
