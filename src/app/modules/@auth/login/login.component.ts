import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { SaveData } from '@app/@core/@data/API/safe-data';
import { LoginDataObject, LoginDataResponse } from '@app/@core/@data/userData';
import { AlertService } from '@app/@core/services/alert.service';
import { AuthService } from '@app/@core/services/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, SaveData {
  loading = false;
  loginForm!: FormGroup;
  hide = true;
  submitted = false;
  returnUrl?: string;
  count=0;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    // private location: Location,
    private route: ActivatedRoute,

    public authService: AuthService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,


  ) { }
  isDataSaved(): boolean {
    return !this.loginForm.dirty
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.loginForm.controls['email'].valueChanges.subscribe((res) => {
    // this.loginForm.get('email')?.setValue(res?.trim(), {emitEvent: false});
  });
  new Promise(resolve => {
    this.loadScript();
  });

  }   
  
  loadScript() {
    const node = document.createElement('script');
    node.src = 'https://accounts.google.com/gsi/client'; // put there your js file location
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
   document.getElementsByTagName('head')[0].appendChild(node);
  }
  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.spinner.show();
    const payload: LoginDataObject = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    };
    this.authService.Login(payload).subscribe(
      (res: ApiResponse<LoginDataResponse>) => {
        console.log('Login ', res.message!);
        this.spinner.hide();
        // location.reload();
        this.alertService.success(res.message!)
        this.router.navigateByUrl(this.returnUrl||'');

      },
      (err) => {
        this.spinner.hide();
        console.log(err);
        // this.loading = false;
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
}
