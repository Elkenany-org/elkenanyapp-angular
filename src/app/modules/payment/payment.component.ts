import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertService } from '@app/@core/services/alert.service';
import { PaymentService } from '@app/@core/services/payment/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(    private payment: PaymentService , 
                  private sanitizer: DomSanitizer,
                  private fb: FormBuilder,    
                  private alertService: AlertService,


    ) { }
iframe:any;
phoneForm!: FormGroup;
walletFlag=false;
text:string | undefined;
  ngOnInit(): void {
    this.phoneForm = this.fb.group({
      phone: ['', [Validators.required]],
    });
  }
  get f() {
  return this.phoneForm.controls; 
}

  onSubmit(): void {
    const payload = {
      phone: this.phoneForm.controls['phone'].value
    };
    if(payload.phone !=''){
      this.payment.wallet(payload).subscribe(res=>{
      window.location.href=res.data.iframe;
    })
    }
    else{    
      this.alertService.error("برجاء ادخال رقم الهاتف");

     }
  }

  credit(){
    this.payment.credit().subscribe(res=>{
      // this.iframe = this.sanitizer.bypassSecurityTrustHtml(res.data.iframe);  
      // this.text=this.iframe.changingThisBreaksApplicationSecurity;
      window.location.href=res.data.iframe;
    })
  }

  wallet(){
    this.walletFlag=true
  }

}
