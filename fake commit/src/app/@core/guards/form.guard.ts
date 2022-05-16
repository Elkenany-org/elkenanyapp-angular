import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SaveData } from '../@data/API/safe-data';

@Injectable({
  providedIn: 'root'
})
export class FormrGuard implements CanDeactivate<SaveData> {
  canDeactivate(component: SaveData, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      console.log("any thing")
    if(!component.isDataSaved()) {
      if (confirm('Are you sure?')) {
        return true
      }else {
        return false
      }
    }
    return true
  }
}