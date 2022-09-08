import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgetDataObject } from '@app/@core/@data/userData';
import { AlertService } from '@app/@core/services/alert.service';
import { AuthService } from '@app/@core/services/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  loading = false;
  forgetForm!: FormGroup;
  codeForm!: FormGroup;
  hide = true;
  submitted = false;
  returnUrl?: string;
  count=0;
  code=false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    // private location: Location,
    private route: ActivatedRoute,

    public authService: AuthService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private titleService:Title
  ) { }

  isDataSaved(): boolean {
    return !this.forgetForm.dirty
  }

  ngOnInit(): void {
    this.titleService.setTitle(" نسيت كلمةالسر");

    // this.analytics.setUpAnalytics();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
    this.forgetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.codeForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });


  } 
   
  
  get f() { return this.codeForm.controls; }
message=""
  sendCode(): void {
    this.spinner.show();
    const payload = {
      email: this.forgetForm.controls['email'].value,
    };    
    console.log('====================================');
    console.log(payload.email);
    console.log('====================================');
    this.authService.forget_password(payload).subscribe(
      (res) => {
        console.log('forget ', res.message!);
        this.spinner.hide();
        this.code=true;
        this.message=res.message!
        setTimeout(() => {
          this.message=""
        }, 2000);
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
        this.alertService.error(err.error.error);
    
      }
    );
  }

  onSubmit(): void {
    this.spinner.show();
    const payload: ForgetDataObject = {
      email:  this.forgetForm.controls['email'].value,
      code: this.codeForm.controls['code'].value,
      password: this.codeForm.controls['password'].value

    };
    this.authService.foget_code(payload).subscribe(
      (res) => {
        console.log('forget ', res.message!);
        this.spinner.hide();
        // this.alertService.success(res.message!)
        this.message=res.message!
        setTimeout(() => {
          this.message=""
          this.router.navigate(['/user/login']);
        }, 2000);

      },
      (err) => {
        this.spinner.hide();
        console.log(err);
        this.alertService.error(err.error.error);
    
      }
    );
  }


}
