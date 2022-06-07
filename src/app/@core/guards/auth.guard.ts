import {Injectable} from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import {LocalstorageService} from '../services/localstorage.service';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {
  constructor(private localstorageService: LocalstorageService,
              public router: Router) {
  }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // console.log(this.localstorageService.state$?.value['token'])
    console.log(!!this.localstorageService.state$?.value)


 



      if (
        !this.localstorageService.state$?.value||
        !this.localstorageService.state$.value['token'] ||
        this.localstorageService.state$.value['token'] === null ||
        this.localstorageService.state$.value['token'] === ''
      ) {
        this.router.navigate(['/user/login'], { queryParams: { returnUrl: state.url }}).then();
        return false;
      }
  

    return true;
  }

}
