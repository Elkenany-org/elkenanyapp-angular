import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PaymentService } from '@app/@core/services/payment/payment.service';
import { AuthService } from '@app/@core/services/auth/auth.service';
import { User } from '@app/@core/@data/userData';
import { GmailService } from './gmail.service';
import { GoogleSigninService } from './google-signin.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  user?: gapi.auth2.GoogleUser
  messages?: gapi.client.gmail.Message[]
  message?: string
  constructor(
    private paymeny: PaymentService,
    private ref: ChangeDetectorRef,
    private gmailService: GmailService,
    private signInService: GoogleSigninService
  ) {}
  ngOnInit() {
    this.signInService.observable().subscribe((user) => {
      this.user = user!!
      console.log(user);
      // this.messages = [];
      // this.message = '';
      this.ref.detectChanges();
    });
  }

  signIn() {
    this.signInService.signin();
  }
  signOut() {
    this.signInService.signOut();
  }
  // list() {
  //   this.gmailService.list(this.user!!).then((result) => {
  //     this, (this.messages = result.messages);
  //     this.ref.detectChanges();
  //   });
  // }
  // getMessage(id: string) {
  //   this.gmailService
  //     .getMessage(this.user!!, id)
  //     .then((result) => (this.message = result));
  //   this.ref.detectChanges();
  // }
}
