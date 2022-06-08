import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Gallery } from '@app/@core/interfaces/gallery/gallery';
import { GallaryService } from '@app/@core/services/modules/gallery/gallary.service';


@Injectable({
  providedIn: 'root'
})
export class GallaryResolver implements Resolve<ApiResponse<Gallery>>{
   

  constructor(private Gallary: GallaryService ,private router: Router) { }

  resolve(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot):  Observable<ApiResponse<Gallery>>  {
    console.log("resolver is work ",route.paramMap.get('id') )
   let id:any = route.paramMap.get('id')
   return this.Gallary.gallery(id).pipe(
     catchError(() => {
       this.router.navigate([""]);
       return EMPTY
     })
   )
  }
 
 
}
