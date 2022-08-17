import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../@core/services/auth/auth.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Profile } from '@app/@core/@data/userData';
import { ToasterService } from './../../../@core/services/toastr.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  profileForm!:FormGroup
  profile?:Profile
  constructor(
    private auth : AuthService,
     private fb:FormBuilder,
     private toster: ToasterService,
     private titleService:Title
     ) { }

  ngOnInit(): void {
    this.titleService.setTitle("الاعدادات");

    this.profileForm = this.fb.group({
      name: [''],
      email:[''],
      id: [''],
      image: [''],
      phone: [''],
      state: ['']

    })
    this.auth.profile().subscribe(res => {
      this.profile =res.data
      // console.log(this.profile);
      this.profileForm.patchValue({
        name: res.data?.name,
        email:res.data?.email, 
        phone:res.data?.phone, 
        id:res.data?.id, 
        image:res.data?.image, 
        state:res.data?.state, 
      })
      
    })


  }

  submit(form:FormGroup) {
    let body = form.value
    // console.log(body);
    this.auth.updateProfile(body).subscribe(res => {
      this.toster.showSuccess(res.message as string)

      // console.log(res.message);
      
    })
  } 

}
