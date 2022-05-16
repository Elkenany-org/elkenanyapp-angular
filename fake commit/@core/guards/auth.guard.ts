import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {LocalstorageService} from '../services/localstorage.service';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {
  constructor(private localstorageService: LocalstorageService,
              public router: Router) {
  }

  canActivate(): boolean {
    // console.log(this.localstorageService.state$?.value['token'])
    console.log(!!this.localstorageService.state$?.value)


 



      if (
        !this.localstorageService.state$?.value||
        !this.localstorageService.state$.value['token'] ||
        this.localstorageService.state$.value['token'] === null ||
        this.localstorageService.state$.value['token'] === ''
      ) {
        this.router.navigate(['/user/login']).then();
        return false;
      }
  

    return true;
  }

}
