import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ShipsTrafficService } from '../../../modules/services/ships-traffic/_core/services/ships-traffic.service';
import { Ships } from '@app/@core/interfaces/ships-traffic/ships-traffic';
import {  Magazines } from '../../interfaces/magazine/magazine';
import { MagazineService } from '../../../modules/services/magazine/_core/services/magazine.service';


@Injectable({
  providedIn: 'root'
})
export class MagazineResolver implements Resolve<ApiResponse<Magazines>>{
   

  constructor(private magazine: MagazineService ,private router: Router) { }

  resolve(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot):  Observable<ApiResponse<Magazines>>  {
    console.log("resolver is work ")

   return this.magazine.magazines("poultry",0,'','').pipe(
     
     catchError(() => {
       this.router.navigate([""]);
       return EMPTY
     })
   )
  }
 
 
}
