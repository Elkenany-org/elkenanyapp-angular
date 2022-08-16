import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event, ActivatedRoute } from '@angular/router';
import { ToasterService } from '@app/@core/services/toastr.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import {delay, filter} from 'rxjs/operators';
import { AnalyticsService } from './@core/services/analytics.service';

// declare const gtag: Function;
declare const gtag: Function;

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

constructor(private _loading: ToasterService,private scroll: ViewportScroller ,private router:Router,private titleService: Title
  ){
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe((event: NavigationEnd) => {
    //    gtag('event', 'page_view', {
    //       page_path: event.urlAfterRedirects
    //    })
    //   })
  }

@HostListener('window:scroll', ['$event']) onScroll(event:any){
  this.pageYoffset = window.pageYOffset;
  // console.log(this.pageYoffset);
  if(window.pageYOffset < 100 )
  this.offsetFlag = true;
 else
   this.offsetFlag = false;

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
  ngOnInit(): void {
    this.listenToLoading();
    this.setUpAnalytics();
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
        console.log('====================================');
        console.log('google analytics is running');
        console.log(event.urlAfterRedirects);
        console.log('====================================');

      }      
    })
  }
  // setUpAnalytics(){
  //   this.router.events.subscribe((event) => {
  //     if (event instanceof NavigationEnd) {
  //       gtag('config', 'G-B1Y47W3VQM', { 'page_path': event.urlAfterRedirects });
  //       console.log('====================================');
  //       console.log('google analytics is running app');
  //       console.log('====================================');
  //     }      
  //   })
  // }
  //  handleCredentialResponse(response:any) {
  //   const helper = new JwtHelperService();
  //   const responsePayload = helper.decodeToken(response.credential);
  //   console.log("ID: " + responsePayload.sub);
  //   console.log('Full Name: ' + responsePayload.name);
  //   console.log('Given Name: ' + responsePayload.given_name);
  //   console.log('Family Name: ' + responsePayload.family_name);
  //   console.log("Image URL: " + responsePayload.picture);
  //   console.log("Email: " + responsePayload.email);    
  // }

  // scrollToTop(){
  //   window.scroll(0,0);
  //   }


  //  scrollFunction() {
  //     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
  //       document.getElementById('myBtn')?.setAttribute("style","display:block");
  //     } else {
  //       document.getElementById('myBtn')?.setAttribute("style","display:none")
  //           }
  //   }
    
  //   window.onscroll = function() {      
  //     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
  //     document.getElementById('myBtn')?.setAttribute("style","display:block");
  //   } else {
  //     document.getElementById('myBtn')?.setAttribute("style","display:none")
  //         }
  // }

  


}
