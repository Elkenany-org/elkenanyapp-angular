import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent  {
  
  constructor(private scroller: ViewportScroller, private router: Router) {}


  goDown1(s:string) {
    this.scroller.scrollToAnchor(s);
  }
}
