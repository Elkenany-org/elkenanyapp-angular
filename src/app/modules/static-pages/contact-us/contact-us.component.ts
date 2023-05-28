import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@app/@core/services/alert.service';
import { ContactService } from '@app/@core/services/modules/contact-us/contact.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private titleService:Title,private fb: FormBuilder,     private alertService: AlertService, private contactService:ContactService
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle('اتصل بنا');
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      job: ['', Validators.required],
      company: ['', Validators.required],
      desc: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const payload: any = {
      name: this.contactForm.controls['name'].value,
      email: this.contactForm.controls['email'].value,
      phone: this.contactForm.controls['phone'].value,
      job: this.contactForm.controls['job'].value,
      company: this.contactForm.controls['company'].value,
      desc: this.contactForm.controls['desc'].value,

    };
    this.contactService.contactUs(payload).subscribe(
      (res) => {
        this.alertService.success('تم الارسال ')
      },
      (err) => {
        console.log(err);
        this.alertService.error(' خطأ بالارسال ');
    
      }
    );
  }


}
