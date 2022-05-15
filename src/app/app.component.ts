import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

   toggleMenu = false;



onToggleMenu(){
    if(this.toggleMenu === true){
       this.toggleMenu = false;
    }else{
      this.toggleMenu = true;
    }
  }

  title = 'Elkenany';
  
  slides = [
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
  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 4,
    "dots": true,
    "autoplay": true,
    "autoplaySpeed": 3000,
  };
  
  slideConfig_main = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "dots": true,
    // "autoplay": true,
    // "autoplaySpeed": 3000,
  };
  
  addSlide() {
    this.slides.push({img: "http://placehold.it/350x150/777777"})
  }
  
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  
  slickInit(e:any) {
  }
  
  breakpoint(e:any) {
  }
  
  afterChange(e:any) {
  }
  
  beforeChange(e:any) {
  }  


}
