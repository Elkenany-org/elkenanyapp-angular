import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginDataObject, LoginDataResponse, Profile, RegisterDataObject, UserProfile,  } from '@app/@core/@data/userData';
import {environment as env} from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalstorageService } from './localstorage.service';
import { Router } from '@angular/router';
import { ToasterService } from '@app/@core/services/toastr.service';
import { ApiResponse } from '@app/@core/@data/API/api';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userDataBehaviorSubject = new BehaviorSubject<UserProfile | null>(null)
  Url = `${env.ApiUrl}`;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalstorageService,
    private Toaster:ToasterService,
    private router: Router,
  ) {
    // this.profileUser();

  }

  profile():Observable<ApiResponse<Profile>> {
    return this.http.get<ApiResponse<Profile>>(`${env.ApiUrl}/profile`)
  }

  updateProfile(body:Profile):Observable<ApiResponse<Profile>>{
    return this.http.post<ApiResponse<Profile>>(`${env.ApiUrl}/profile-update`,body)
  }
  Login(data: LoginDataObject): Observable<ApiResponse<LoginDataResponse>> {
    return this.http.post<ApiResponse<LoginDataResponse>>(`${this.Url}/login`, data).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((data) => {
        this.localStorageService.setState('token', data?.data?.api_token);
        let user = {
          name: data?.data?.name,
          email:  data?.data?.email,
          phone:  data?.data?.phone
        }
        localStorage.setItem('user',JSON.stringify(user))
                // this.localStorageService.setState('user', data?.data);

        // this.profileUser();
      })
    );


  }

  Register(data: RegisterDataObject): Observable<ApiResponse<LoginDataResponse>> {
    return this.http.post<ApiResponse<LoginDataResponse>>(`${this.Url}/register`, data)
    .pipe(
      tap((data) => {
        this.localStorageService.setState('token', data?.data?.api_token)
        // this.profileUser();

      })
    )



  }


  //not working now
  CheckAuth(): Observable<ApiResponse<number>> {

    let token
    if(localStorage.getItem('state')){
      token =JSON.parse(localStorage.getItem('state')||"") ;;
    }else {
      token= {token: ''}
    }
    return this.http.post(`${env.ApiUrl}/customer/check-login`, {api_token: token});
  }

  //not working now
  EditPassword(password: string): Observable<ApiResponse<{ user: User }>> {
    return this.http.post<ApiResponse<{ user: User }>>(`${env.ApiUrl}/Test`, {password});
  }

  Logout(): void {
    this.Toaster.showSuccess("تم تسجيل الخروج")
    setTimeout(()=>{
      location.reload();
    }
    ,1000)
    this.userDataBehaviorSubject.next(null);
    this.localStorageService.setState('token', null);
    this.localStorageService.ClearStorage();
  }


}


export interface User {
  name: string
  email: string
  phone: string
  api_token: string
}



