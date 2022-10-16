import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { sector } from '@app/@core/@data/app/filter-list';
import { application } from '@app/@core/interfaces/employment/applicants';
import { JobDetials } from '@app/@core/interfaces/employment/Job';
import { Sector } from '@app/@core/interfaces/_app/app-response';
import { EmploymentService } from '@app/@core/services/modules/employment/employment.service';
import { ToasterService } from '@app/@core/services/toastr.service';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.scss']
})
export class ApplyJobComponent implements OnInit {


  jobForm!: FormGroup
  pageName:string ="التقديم علي الوظيفة"
  previousUrl?:string
  id :string = ''
  url:string[]=[]

  secId!:number;
  job_id!:string

  cv:any
  constructor(
    private employment:EmploymentService,
    private router: Router,
    private toasterService: ToasterService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private titleService:Title,
) { 

    }

  ngOnInit(): void {
  
    this.titleService.setTitle(this.pageName);

    this.url =  this.router.url.split('/') 
    this.job_id= this.url[  this.url.length-1] 
    // console.log(  this.url)
    this.AdForm({} as application, this.job_id)

    }



  AdForm (data: application, secId: string) {
     this.jobForm = this.fb.group({
       // if the purpose is to add an ad the value of control will be '' if  it is  edit get values from URL
       education:      [(data.id)?data.education: '', [Validators.required]],
       expected_salary:      [(data.id)?data.expected_salary: '', [Validators.required]],
       experience:    [(data.id)?data.experience: '', [Validators.required]],   
       cv:      [(data.id)?data.cv: '', [Validators.required]],
       other_info:      [(data.id)?data.other_info: '', [Validators.required]],
       job_id:   [this.job_id, [Validators.required]],
     })  
     
   }

   handleFileInput(event: any): void {
    const file = event.target.files;
    this.cv=event.target.files.item(0);
    document.getElementById('cv')?.innerText!=this.cv.name+''
  }

  removeImage(name: string | undefined): void {
    // this.AllFiles = this.AllFiles.filter((image) => {
    //   return image.name !== name;
    // });
    
  }
   onSubmit(): void {


    const formData: FormData = new FormData()  
    
   console.log(this.jobForm.value)
    formData.append('expected_salary', this.jobForm.controls['expected_salary'].value);
    formData.append('cv_link', this.cv);
    formData.append('education', this.jobForm.controls['education'].value);
    formData.append('experience', this.jobForm.controls['experience'].value);
    formData.append('other_info',  this.jobForm.controls['other_info'].value);
    formData.append('job_id',  this.jobForm.controls['job_id'].value);


     formData.forEach(ite => console.log(ite))
    console.log(formData)

 //createad


        this.employment.apply_job(formData).subscribe( (res) => {
           console.log(res)

          this.toasterService.stopLoading();
          this.toasterService.showSuccess(res.message+'')
          // this.router.navigate([`/market/${this.url[2]}/ad_details/${res.data?.job_detials.id}`])

        }, (err) => {
          this.toasterService.stopLoading();
          this.toasterService.showFail(err.error.error)

          // console.log(err)
        })


  }


  /* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
 myFunction() {
  document.getElementById("myDropdown")!.classList.toggle("show");
  }
  myFunction1() {
    document.getElementById("myDropdown1")!.classList.toggle("show");
  }

 filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementsByClassName("myInput");
  filter = (document.getElementById("myInput") as HTMLInputElement).value.toUpperCase();
  let div = document.getElementById("myDropdown");
  a = div?.getElementsByTagName("a");  
  for (i = 0; i < a!.length; i++) {

    let txtValue = a![i].textContent || a![i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a![i].style.display = "";
    } else {
      a![i].style.display = "none";
    }
  }
}

}
