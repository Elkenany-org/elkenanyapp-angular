import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiResponse } from '@app/@core/@data/API/api';
import { SaveData } from '@app/@core/@data/API/safe-data';
import { LoginDataResponse, RegisterDataObject } from '@app/@core/@data/userData';
import { AlertService } from '@app/@core/services/alert.service';
import { AuthService } from '@app/@core/services/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public authService: AuthService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
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

  }

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
        console.log(err.error.error);
        
        this.alertService.error(err.error.error);
      }
    );
  }

}
