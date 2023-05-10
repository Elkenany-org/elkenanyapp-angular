import { Component, Input, OnChanges, Output,EventEmitter, SimpleChanges} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input()flag:boolean=true
  @Input()maincard:boolean=false
  @Input()subcard:boolean=false

  @Input() data:any 
  @Input() loading:boolean = true 

  @Output() navigation = new EventEmitter<string>()
  @Output() outpiutData = new EventEmitter<{id: string, type: string}>()
  
  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "dots": false,
    "autoplay": true,
    "autoplaySpeed": 3000,
  };

  
  constructor(private router: Router) {

   }

  

      counter(i: number) {
      return new Array(Math.floor(i));
  }
  counter1(i: number) {
    return new Array(Math.ceil(i));
}
  navigationTest(value: any , type?:string) {
  
    //getted from event
    this.navigation.emit(value)

  }


  output(id: string , type:string) {
    this.navigation.emit(id)

    this.outpiutData.emit({id: id, type: type})

  }

}
