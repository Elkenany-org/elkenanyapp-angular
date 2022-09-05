import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PaymentService } from '@app/@core/services/payment/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(    private payment: PaymentService , 
                  private sanitizer: DomSanitizer,
    ) { }
iframe:any;
text:string | undefined;
  ngOnInit(): void {
    this.payment.credit().subscribe(res=>{
      console.log('====================================');
      console.log(res);
      console.log('====================================');
      this.iframe = this.sanitizer.bypassSecurityTrustHtml(res.data.iframe);  
      console.log(this.iframe);
      this.text=this.iframe.changingThisBreaksApplicationSecurity;

    })
  }

}
