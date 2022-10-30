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
  image?:any
  imagePath?:any

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
      avatar: [''],
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
        // avatar:res.data?.image, 
        state:res.data?.state, 
      })
      
    })


  }

  submit(form:FormGroup) {
    const formData: FormData = new FormData()  

    formData.append('name',form.controls['name'].value)
    formData.append('email',form.controls['email'].value)
    formData.append('phone',form.controls['phone'].value)

    // let body = form.value
     if(this.image){
        formData.append('avatar', this.image);
    }

    this.auth.updateProfile(formData).subscribe(res => {
      this.toster.showSuccess(res.message as string)

      
    })
  } 

  url:any;
  handleFileInput(event: any): void {
    this.image=event.target.files.item(0);
    
    var element= document.getElementById("image") as HTMLImageElement;
 
    const reader = new FileReader();
    reader.readAsDataURL(this.image); 
    reader.onload = (_event) => { 
        this.url = reader.result; 
        element.src=this.url
    }

  }
}
