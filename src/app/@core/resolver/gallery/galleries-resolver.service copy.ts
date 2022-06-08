import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { catchError, EMPTY, Observable } from 'rxjs';
import { GallriesData } from '@app/@core/interfaces/gallery/gallery';
import { GallaryService } from '@app/@core/services/app/gallery/gallary.service';


@Injectable({
  providedIn: 'root'
})
export class GalleriesResolver implements Resolve<ApiResponse<GallriesData>>{
  public filterData:{[key:string]:string}= {
    sector:'poultry',
    countries:'',
    cities:'',
    sort:"0",
    search:"",
    page:''

  }

  constructor(private gallery: GallaryService ,private router: Router) { }


  resolve(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot):  Observable<ApiResponse<GallriesData>>  {
    console.log("resolver is work ")

   return this.gallery.galleries(this.filterData).pipe(
     
     catchError(() => {
       this.router.navigate([""]);
       return EMPTY
     })
   )
  }
 
 
 
}
