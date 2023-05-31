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
    // localStorage.setItem('total','0');

    if(localStorage.getItem('state') == undefined){
        this.loginByGooglePopup();
    }

    this.router.events.subscribe(events => {
      if (events instanceof NavigationEnd) {
        this.routeurl1 = decodeURIComponent(this.router.url)
      }
    });

  
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
  loginByGooglePopup(){
    window.google.accounts.id.initialize({
      client_id: "552649577410-qs09ipcibvdfcfd97phi3drru3qufis0.apps.googleusercontent.com",
      callback:  (response:any)=>{
        const helper = new JwtHelperService();
        const responsePayload = helper.decodeToken(response.credential);
        let data = {
          email:responsePayload.email,
          name:responsePayload.name,
          google_id:responsePayload.sub,
          device_token:'52151',
        }
        this.auth.RegisterLogin_google(data).subscribe((res:any) => {
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
