import { EventEmitter, Injectable, Output, Renderer2 } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, tap } from 'rxjs';
import { ForgetDataObject, ForgetDataResponse, LoginDataObject, LoginDataResponse, notificationsRes, Profile, RegisterDataObject, UserProfile,  } from '@app/@core/@data/userData';
import {environment as env} from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalstorageService } from './localstorage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from '@app/@core/services/toastr.service';
import { ApiResponse } from '@app/@core/@data/API/api';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { GoogleAuthProvider } from 'firebase/auth';
import { googleRegister } from './../../@data/userData';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "environments/environment";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() deviceToken = new EventEmitter<string>();
  @Output() dataTonav = new EventEmitter<boolean>();

  
  userDataBehaviorSubject = new BehaviorSubject<UserProfile | null>(null)
  Url = `${env.ApiUrl}`;
  currentURL= this.route.snapshot.queryParams['returnUrl'] || '/'
  // private auth2?:gapi.auth2.GoogleAuth
  // private subject = new ReplaySubject<gapi.auth2.GoogleUser|null>(1)
  constructor(
    private http: HttpClient,
    private localStorageService: LocalstorageService,
    private Toaster:ToasterService,
    private router: Router,
    private route: ActivatedRoute,
    private socialAuthService: SocialAuthService,
    public afAuth: AngularFireAuth

  ) {
    // this.profileUser();
    // gapi.load('auth2', () => {
    //   this.auth2 = gapi.auth2.init({
    //     client_id:'804758451233-ar5o87feftpucm7mqpn1msf0go9haa3k.apps.googleusercontent.com'
    //   })
    // })
  }


  // public signIn() {
  //   this.auth2?.signIn({
  //     scope: 'https://www.googleapis.com/auth/gmail.readonly'
  //   }).then( user => {
  //     console.log(user);
      
  //     this.subject.next(user)
  //   }).catch(() => {
  //     console.log('h');
  //     this.subject.next(null)

  //   })
  // }

  // public signOut2 () {
  //   this.auth2?.signOut()
  //   .then( ()=> {
  //     this.subject.next(null)
  //   })
  // }

  // public observable() {
  //   return this.subject.asObservable()
  // }


  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  AuthLogin(provider:any) {
    let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    return this.afAuth
      .signInWithPopup(provider)
      .then((result:any) => {

        let res = result?.additionalUserInfo?.profile
        // console.log(res);

        let data = {
          email:res?.email,
          name:`${res.given_name} ${res.family_name}`,
          google_id:res?.id,
          device_token:'52151',
        }
        this.RegisterLogin_google(data).subscribe((res:any) => {
          // console.log(res);
          this.localStorageService.setState('token', res.data.api_token);
          let user = {
            name: res.data.name,
            email:  res.data.email,
            phone: ''
          }
          localStorage.setItem('user',JSON.stringify(user))
          this.router.navigateByUrl(returnUrl||'');

        })
        console.log('You have been successfully logged in!');
      })
      .catch((error) => {
        console.log(error.error);
      });
  }

  AuthLoginSocial() {
    //         console.log(response);
    // let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    //     let data = {
    //       email:response?.email,
    //       name:response?.name,
    //       google_id:response?.sub,
    //       device_token:'52151',
    //     }
    //     this.RegisterLogin_google(data).subscribe((res:any) => {
    //       console.log(res);
    //       this.localStorageService.setState('token', res.data.api_token);
    //       let user = {
    //         name: res.data.name,
    //         email:  res.data.email,
    //         phone: ''
    //       }
    //       localStorage.setItem('user',JSON.stringify(user))
    //       this.router.navigateByUrl(returnUrl||'');

    //     })
        console.log('You have been successfully logged in!');

  }

  profile():Observable<ApiResponse<Profile>> {
    return this.http.get<ApiResponse<Profile>>(`${env.ApiUrl}/profile`)
  }

  

  updateProfile(body:Profile):Observable<ApiResponse<Profile>>{
    return this.http.post<ApiResponse<Profile>>(`${env.ApiUrl}/profile-update`,body)
  }



  RegisterLogin_google(data: any): Observable<ApiResponse<googleRegister>> {
    return this.http.post<ApiResponse<LoginDataResponse>>(`${this.Url}/reg-log-google`, data)
    .pipe(
      tap((data) => {
        
        // this.localStorageService.setState('token', data?.data?.api_token)
        // this.profileUser();

      })
    )
  }

  RegisterLogin_facebook(data: any): Observable<ApiResponse<googleRegister>> {
    return this.http.post<ApiResponse<LoginDataResponse>>(`${this.Url}/reg-log-facebook`, data)
    .pipe(
      tap((data) => {
        
        // this.localStorageService.setState('token', data?.data?.api_token)
        // this.profileUser();

      })
    )
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

  forget_password(data:{email: string}): Observable<ApiResponse<ForgetDataResponse>> {
    return this.http.post<ApiResponse<ForgetDataResponse>>(`${this.Url}/forget-password`, data)
  }

  foget_code(data: ForgetDataObject): Observable<ApiResponse<LoginDataResponse>> {
    return this.http.post<ApiResponse<LoginDataResponse>>(`${this.Url}/forget-password-code`, data)
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
    // setTimeout(()=>{
    //   location.reload();
    // }
    // ,1000)
    this.dataTonav.emit(false)
    this.userDataBehaviorSubject.next(null);
    this.localStorageService.setState('token', null);
    this.localStorageService.ClearStorage();
  }


  //--------------------------- login with facebook--------------------------//
  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((res:any)=> {
      let data = {
        email:res?.email,
        name:`${res.firstName} ${res.lastName}`,
        facebook_id:res?.id,
        device_token:'52151',
      }
      this.RegisterLogin_facebook(data).subscribe((res:any) => {
        this.storeLocalStorge(res)
        this.router.navigateByUrl(this.currentURL||'');
        console.log('You have been successfully logged in!');
      })
    }).catch((err)=> {
      console.log(err);
      
    });
  }


 
  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res:any)=> {
      // console.log(res);
      // console.log("hello then");

      let data = {
        email:res?.email,
        name:`${res.firstName} ${res.lastName}`,
        google_id:res?.id,
        device_token:'52151',
      }
      this.RegisterLogin_google(data).subscribe((res:any) => {
        this.storeLocalStorge(res)
        this.router.navigateByUrl(this.currentURL||'');
        console.log('You have been successfully logged in!');
      })
    }).catch((err)=> {
      // console.log("hello err");
      
      console.log(err);
      
    });
  }


  signOut(): void {
    this.socialAuthService.signOut();
  }

  storeLocalStorge(res:any){
    this.localStorageService.setState('token', res.data.api_token);
    let user = {
      name: res.data.name,
      email:  res.data.email,
      phone: ''
    }
    localStorage.setItem('user',JSON.stringify(user))
  }



//   loadJsScript(renderer: Renderer2, src: string) {
//     const script = renderer.createElement('script');

//     script.type = 'text/javascript';
//     script.src = src;
//     renderer.appendChild(document.body, script);
    
//     window.onload = function () {
//       google.accounts.id.initialize({
//         client_id: "552649577410-qs09ipcibvdfcfd97phi3drru3qufis0.apps.googleusercontent.com",
//         callback : (response: any)=>{
//           const helper = new JwtHelperService();

//             const responsePayload = helper.decodeToken(response.credential);

//             console.log("ID: " + responsePayload.sub);
//             console.log('Full Name: ' + responsePayload.name);
//             console.log('Given Name: ' + responsePayload.given_name);
//             console.log('Family Name: ' + responsePayload.family_name);
//             console.log("Image URL: " + responsePayload.picture);
//             console.log("Email: " + responsePayload.email);    
//     }
//         }
//       );
//       google.accounts.id.renderButton(
//         document.getElementById("buttonDiv"),
//         { theme: "outline", size: "large" }  // customization attributes
//       );
//       google.accounts.id.prompt(); // also display the One Tap dialog
//     }
//   }
//   }

// //   handleCredentialResponse(response: any) {

// // 





deviceTokenTemp:string="";
message:any = null;
requestPermission() {
  const messaging = getMessaging();
  // if ('serviceWorker' in navigator) {
  //   navigator.serviceWorker.register('../firebase-messaging-sw.js')
  //     .then(function(registration) {
  //       // console.log('Registration successful, scope is:', registration.scope);
  //     }).catch(function(err) {
  //       // console.log('Service worker registration failed, error:', err);
  //     });
  //   }
  getToken(messaging, 
   { vapidKey: environment.firebase.vapidKey}).then(
     (currentToken) => {
       if (currentToken) {
         console.log("Hurraaa!!! we got the token.....");
         console.log(currentToken);  
         this.deviceTokenTemp=currentToken
         this.deviceToken.emit(this.deviceTokenTemp)
       } else {
        //  console.log('No registration token available. Request permission to generate one.');
       }
   }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
  });

}
listen() {
  const messaging = getMessaging();
  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    this.message=payload;
  });
}

getDeviceToken(){
  this.deviceToken.emit(this.deviceTokenTemp)
}

}


export interface User {
  name: string
  email: string
  phone: string
  api_token: string
}



