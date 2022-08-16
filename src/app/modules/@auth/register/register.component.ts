import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { SaveData } from '@app/@core/@data/API/safe-data';
import { LoginDataResponse, RegisterDataObject } from '@app/@core/@data/userData';
import { AlertService } from '@app/@core/services/alert.service';
import { AnalyticsService } from '@app/@core/services/analytics.service';
import { AuthService } from '@app/@core/services/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';

// declare const gtag: Function;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit, SaveData {
  loading = false;
  RegisterForm!: FormGroup;
  hide = true;
  returnUrl?: string;
  errorMessage:any=''
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public authService: AuthService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private titleService:Title
  ) {

   }

  ngOnInit(): void {
    this.titleService.setTitle("حساب جدبد");
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.RegisterForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      device_token: ['']
    });
    this.RegisterForm.controls['email'].valueChanges.subscribe((res) => {
      this.RegisterForm.get('email')?.setValue(res?.trim(), {emitEvent: false});
    });

    // new Promise(resolve => {
    //   this.loadScript();
    // });
        
    // this.setUpAnalytics1();

  }

  // setUpAnalytics(){
  //   this.router.events.subscribe((event) => {
  //     if (event instanceof NavigationEnd) {
  //       gtag('config', 'G-B1Y47W3VQM', { 'page_path': '/register' });

  //       console.log('====================================');
  //       console.log('google analytics is running register');
  //       console.log(event.urlAfterRedirects);
  //     }      
  //   })
  // }

  isDataSaved(): boolean {
    return !this.RegisterForm.dirty
  }

  onSubmit(): void {
    this.spinner.show();
    this.loading = true;
    const payload: RegisterDataObject = {
      name: this.RegisterForm.controls['name'].value,
      email: this.RegisterForm.controls['email'].value,
      phone: this.RegisterForm.controls['phone'].value,
      password: this.RegisterForm.controls['password'].value,
      device_token: 'web'
    };
    this.spinner.show()

    this.authService.Register(payload).subscribe(
      (res: ApiResponse<LoginDataResponse>) => {
        this.spinner.hide();
        this.alertService.success(res.message!);
        this.router.navigateByUrl(this.returnUrl||'');
        // location.reload();
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
        this.errorMessage=err.error.error
        this.alertService.error(err.error.error);
      }
    );
  }

  handleCredentialResponse(response:any) {
    const helper = new JwtHelperService();
    const responsePayload = helper.decodeToken(response.credential);
    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);    
  }  
  
  loadScript() {
    const node = document.createElement('script');
    node.src = 'https://accounts.google.com/gsi/client'; // put there your js file location
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
   document.getElementsByTagName('head')[0].appendChild(node);
  }
}
