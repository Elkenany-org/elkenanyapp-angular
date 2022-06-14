import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../@core/services/auth/auth.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Profile } from '@app/@core/@data/userData';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  profileForm!:FormGroup
  profile?:Profile
  constructor(private auth : AuthService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [''],
      email: [''],
    })
    this.auth.profile().subscribe(res => {
      this.profile =res.data
      console.log(this.profile);
      this.profileForm.patchValue({
        name: res.data?.name,
        email:res.data?.email, 
      })
      
    })


  }

  submit(form:FormGroup) {
    console.log(form.value);
    
  } 

}
