import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginDataObject, LoginDataResponse, RegisterDataObject, UserProfile } from '../@data/userData';
import {environment as env} from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalstorageService } from './localstorage.service';
import { Router } from '@angular/router';
import { ApiResponse } from '../@data/API/api';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userDataBehaviorSubject = new BehaviorSubject<UserProfile | null>(null)
  Url = `${env.ApiUrl}`;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalstorageService,
    private router: Router,
  ) { 
    // this.profileUser();

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
      // tslint:disable-next-line:no-shadowed-variable
      tap((data) => {
        this.localStorageService.setState('token', data?.data?.api_token);
        // this.profileUser();
      })
    );

    
  }
  profileUser():void {
    const localItem = this.localStorageService.state$.getValue()?.['token'];
    if(localItem) {
      this.CheckAuth(localItem).subscribe((result)=> {
        if(result?.data === 1) {
          // this.userDataBehaviorSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        }
      })
    }
  }

  //not working now
  CheckAuth(token: string): Observable<ApiResponse<number>> {
    return this.http.post(`${env.ApiUrl}/check-login`, {api_token: token});
  }

  //not working now
  EditPassword(password: string): Observable<ApiResponse<{ user: User }>> {
    return this.http.post<ApiResponse<{ user: User }>>(`${env.ApiUrl}/Test`, {password});
  }

  Logout(): void {
    this.userDataBehaviorSubject.next(null);
    this.localStorageService.setState('token', null);
    this.localStorageService.ClearStorage();
    location.reload();
  }
}


export interface User {
  name: string
  email: string
  phone: string
  api_token: string
}
