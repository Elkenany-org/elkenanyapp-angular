import {Injectable} from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import {LocalstorageService} from '../services/auth/localstorage.service';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {
  constructor(private localstorageService: LocalstorageService,
              public router: Router,private auth:AuthService) {
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
          this.auth.dataTonav.emit(true)

    return true;
  }

}
