import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { SaveData } from '@app/@core/@data/API/safe-data';
import { LoginDataObject, LoginDataResponse } from '@app/@core/@data/userData';
import { AlertService } from '@app/@core/services/alert.service';
import { AuthService } from '@app/@core/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

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

  constructor(
    private router: Router,
    private fb: FormBuilder,
    // private location: Location,
    private authService: AuthService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService
  ) { }
  isDataSaved(): boolean {
    return !this.loginForm.dirty
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.loginForm.controls['email'].valueChanges.subscribe((res) => {
    this.loginForm.get('email')?.setValue(res?.trim(), {emitEvent: false});
  });
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
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
        // this.loading = false;
        this.alertService.error(err.error.error);
    
      }
    );
  }
}
