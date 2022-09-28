import { ViewportScroller } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event, ActivatedRoute } from '@angular/router';
import { ToasterService } from '@app/@core/services/toastr.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import {delay, filter} from 'rxjs/operators';
import { ApiResponse } from './@core/@data/API/api';
import { LoginDataResponse } from './@core/@data/userData';
import { AuthService } from './@core/services/auth/auth.service';
import {environment as env} from '../environments/environment';
import { LocalstorageService } from './@core/services/auth/localstorage.service';


// declare const gtag: Function;
declare const gtag: Function;
declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  loading: boolean = false;

   toggleMenu = false;
  pageYoffset: number | undefined;
  offsetFlag = true;
    routeurl1!:string

    data:any;


  constructor(private _loading: ToasterService,
    private scroll: ViewportScroller ,
    private router:Router,
    private route: ActivatedRoute,
    private auth:AuthService,
    private localStorageService:LocalstorageService,
  ){

  }

@HostListener('window:scroll', ['$event']) onScroll(event:any){
  this.pageYoffset = window.pageYOffset;
  // console.log(this.pageYoffset);
  if(window.pageYOffset < 100 )
  this.offsetFlag = true;
 else
   this.offsetFlag = false;

}
  ngOnInit(): void {
    this.listenToLoading();
    this.setUpAnalytics();
    this.auth.requestPermission();
    localStorage.setItem('total','0');

    if(localStorage.getItem('state') == undefined){
      window.google.accounts.id.initialize({
        client_id: "552649577410-qs09ipcibvdfcfd97phi3drru3qufis0.apps.googleusercontent.com",
        callback:  (response:any)=>{
          const helper = new JwtHelperService();
          const responsePayload = helper.decodeToken(response.credential);
          console.log("ID: " + responsePayload.sub);
          console.log('Full Name: ' + responsePayload.name);
          console.log('Given Name: ' + responsePayload.given_name);
          console.log('Family Name: ' + responsePayload.family_name);
          console.log("Image URL: " + responsePayload.picture);
          console.log("Email: " + responsePayload.email);    
          this.data = {
            email:responsePayload.email,
            name:responsePayload.name,
            google_id:responsePayload.sub,
            device_token:'52151',
          }
          this.auth.RegisterLogin_google(this.data).subscribe((res:any) => {
            // console.log(res);
            this.localStorageService.setState('token', res.data.api_token);
            let user = {
              name: res.data.name,
              email:  res.data.email,
              phone: ''
            }
            localStorage.setItem('user',JSON.stringify(user))
            this.auth.dataTonav.emit(true)
            console.log('You have been successfully logged in!');
          })

        }
      });
      window.google.accounts.id.prompt(); // also display the One Tap dialog      
    
    }


  
  }

scrollToTop(){
  this.scroll.scrollToPosition([0,0]);
}
onToggleMenu(){
    if(this.toggleMenu === true){
       this.toggleMenu = false;
    }else{
      this.toggleMenu = true;
    }
  }

  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
  setUpAnalytics(){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('event', 'page_view', {
          page_path: event.urlAfterRedirects
       })

      }      
    })
  }
 
   handleCredentialResponse(response:any) {
    const helper = new JwtHelperService();
    const responsePayload = helper.decodeToken(response.credential);
    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);    
    
  }
  count = 0;

  // loadScriptByUrl(url:any) {
  //   let dynamicScript = document.createElement('script');
  //   dynamicScript.type = 'text/javascript';
  //   dynamicScript.async = true;
  //   dynamicScript.src = url;
  //   dynamicScript.id = 'dynamic_' + this.count;
  //   document.body.appendChild(dynamicScript);
  //   this.count++;

  //   window.onload = function () {
  //     google.accounts.id.initialize({
  //       client_id: "552649577410-qs09ipcibvdfcfd97phi3drru3qufis0.apps.googleusercontent.com",
  //       callback: (response:any)=>{
  //         const helper = new JwtHelperService();
  //         const responsePayload = helper.decodeToken(response.credential);
  //         console.log("ID: " + responsePayload.sub);
  //         console.log('Full Name: ' + responsePayload.name);
  //         console.log('Given Name: ' + responsePayload.given_name);
  //         console.log('Family Name: ' + responsePayload.family_name);
  //         console.log("Image URL: " + responsePayload.picture);
  //         console.log("Email: " + responsePayload.email);    
  //       }
  //     });
  //     google.accounts.id.renderButton(
  //       document.getElementById("buttonDiv")!,
  //       {
  //         theme: "outline", size: "large",
  //         type: 'standard'
  //       }  // customization attributes
  //     );
  //     google.accounts.id.prompt(); // also display the One Tap dialog
  //   }
  // }

}
