import { Component, OnInit } from '@angular/core';
import { PaymentService } from '@app/@core/services/payment/payment.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(
    private paymeny: PaymentService
  ) {}
  ngOnInit() {

    this.paymeny.payment().subscribe(res => {
      console.log(res);
      
      
    },(err:any)=> {
      console.log(err);
      
    })



  }

}