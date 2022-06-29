import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PaymentService } from '@app/@core/services/payment/payment.service';
import { AuthService } from '@app/@core/services/auth/auth.service';
import { User } from '@app/@core/@data/userData';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  user?: gapi.auth2.GoogleUser
  constructor(
    private paymeny: PaymentService,
    private signInService: AuthService,
    private ref: ChangeDetectorRef
  ) {}
  ngOnInit() {

    // this.paymeny.payment().subscribe(res => {
    //   console.log(res);
      
      
    // },(err:any)=> {
    //   console.log(err);
      
    // })
    this.signInService.observable().subscribe( user => {
      this.user = user as gapi.auth2.GoogleUser
    })
  }

  signIn(){
        this.signInService.signIn()
  }
  signOut(){
    this.signInService.signOut()
  }
}