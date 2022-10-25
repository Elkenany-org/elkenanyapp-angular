import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { applicationDetails } from '@app/@core/interfaces/employment/applicants';
import { EmploymentService } from '@app/@core/services/modules/employment/employment.service';
import { ToasterService } from '@app/@core/services/toastr.service';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss']
})
export class ApplicationDetailsComponent implements OnInit {
  profileForm!:FormGroup
  public id!:string
  applicaion?:applicationDetails 
  constructor(private fb:FormBuilder,private employment:EmploymentService,    private route: ActivatedRoute,     private toster: ToasterService,


    ) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [''],
      email:[''],
      id: [''],
      image: [''],
      phone: [''],
      education: [''],
      notice_period: [''],
      expected_salary: [''],
      cv: [''],
      experience: [''],
      other_info:[''],
      qualified:['']

    })
    this.route.params.subscribe(parm => {
      this.id=parm['id']
      this.employment.application_details(this.id).subscribe(
        (res)=>{

          this.applicaion = res.data    
                console.log('====================================');
          console.log(this.applicaion);
          console.log('====================================');
          this.profileForm.patchValue({
            name: res.data?.application.name,
            email:res.data?.application.email, 
            phone:res.data?.application.phone, 
            id:res.data?.application.id, 
            image:res.data?.application.image, 
            education:res.data?.application.education, 
            experience:res.data?.application.experience, 
            notice_period:res.data?.application.notice_period, 
            expected_salary:res.data?.application.expected_salary, 
            cv:res.data?.application.cv, 
            other_info:res.data?.application.other_info,
            qualified:res.data?.application.qualified
          })
        }
      )
    })

  }

  submit(form:FormGroup){
    const formData: FormData = new FormData()  
    formData.append('app_id', form.value.id);
    formData.append('qualified_value', form.value.qualified);
      this.employment.qualified_application(formData).subscribe(
        (res)=>{
          this.toster.showSuccess(res.message as string)
        }
      )
  }
}
