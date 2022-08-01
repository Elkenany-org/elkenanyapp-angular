import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ToasterService } from '@app/@core/services/toastr.service';
import {delay} from 'rxjs/operators';

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

constructor(private _loading: ToasterService,private scroll: ViewportScroller){}

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
  }

  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }


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
