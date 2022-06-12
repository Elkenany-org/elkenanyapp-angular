import { Component, Input, OnInit,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class CarouselComponent implements OnInit {
 
  @Input() config:any = {}; 
  @Input() loading:boolean = true 


  ngOnInit(): void {

    
  }


}
