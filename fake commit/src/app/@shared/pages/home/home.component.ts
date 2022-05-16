import { Component, OnInit } from '@angular/core';

import { Multi_banner,banner_header, Config } from './data'
@Component({
  selector: 'app-home2',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent2 implements OnInit {

  
  banner_header:Config = banner_header
  multi_banner:Config = Multi_banner
  
 constructor() { }
    
ngOnInit(): void {
  this.multi_banner.images =  this.slides_item;
  this.banner_header.images =  this.slides_single;
  }

  


  slides_item = [
    {img: "https://elkenany.com/uploads/full_images/26-09-2116326850971161395258.jpeg"},
    {img: "https://elkenany.com/uploads/full_images/26-09-211632675724156772921.jpeg"},
    {img: "https://elkenany.com/uploads/full_images/26-09-2116326934832024905896.jpeg"},
    {img: "https://elkenany.com/uploads/full_images/26-09-2116326836751487169208.jpeg"},
    {img: "https://elkenany.com/uploads/full_images/27-09-211632744833813085815.jpeg"},
    {img: "https://elkenany.com/uploads/full_images/27-09-211632728667755791962.jpeg"},
    {img: "https://elkenany.com/uploads/full_images/26-09-2116326827351203976322.jpeg"},
    {img: "https://elkenany.com/uploads/full_images/27-09-211632724068153742742.jpeg"},
    {img: "https://elkenany.com/uploads/full_images/27-09-2116327293451150692549.jpeg"},
    {img: "https://elkenany.com/uploads/full_images/26-09-2116326874611403315176.jpeg"}
  ];

  slides_single = [
    {img: "https://elkenany.com/uploads/main/11-11-2116365832901976227957.jpg"},
    {img: "https://elkenany.com/uploads/main/11-11-2116365832901976227957.jpg"},
    {img: "https://elkenany.com/uploads/main/11-11-2116365832901976227957.jpg"},
    {img: "https://elkenany.com/uploads/main/11-11-2116365832901976227957.jpg"},
    {img: "https://elkenany.com/uploads/main/11-11-2116365832901976227957.jpg"},
    {img: "https://elkenany.com/uploads/main/11-11-2116365832901976227957.jpg"},
    {img: "https://elkenany.com/uploads/main/11-11-2116365832901976227957.jpg"},
  ];

  
}