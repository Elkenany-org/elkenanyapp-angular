import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToasterService } from '@app/@core/services/toastr.service';
import { Sector } from '@app/@core/interfaces/_app/app-response';
import { sector } from '@app/@core/@data/app/filter-list';
import { JobDetails } from '@app/@core/interfaces/employment/job-details';
import { EmploymentService } from '@app/@core/services/modules/employment/employment.service';
import { JobDetials } from '@app/@core/interfaces/employment/Job';
import { CompaniesGuideService } from '@app/@core/services/modules/companies-guide/companies-guide.service';
import { AuthService } from '@app/@core/services/auth/auth.service';

interface ImageInterface {
  name?: string;
  file: File;
  fileResult: any;  
}
@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {


  jobForm!: FormGroup
  pageName:string ="إضافة وظيفة"


  previousUrl?:string
  AllFiles: ImageInterface[] = [];
  currentImage: ImageInterface[] = [];//it is come from edit api
  new_Image: ImageInterface[] = []; // it is for new image that may be  will add for edite api

  id :string = ''
  url:string[]=[]

  categories:any;
  Companies:any;
  tempCompanies:any;
   secId!:number;
  deviceToken:string=''
  company_id!:number
  category_id!:number

  constructor(
    private employment:EmploymentService,
    private router: Router,
    private toasterService: ToasterService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private titleService:Title,
    private auth:AuthService
) { 

    }

  ngOnInit(): void {
  
    this.titleService.setTitle(this.pageName);
    this.AdForm({} as JobDetials)


    this.route.params.subscribe( (param: Params) => {
        this.id = '0'
            this.employment.Filter_list().subscribe(
              (res)=>{
                this.categories=res.data?.categories
              })
                this.auth.profile().subscribe(res => {
                    if(res.data?.company_id != null){
                      this.company_id=parseInt(res.data?.company_id);
                      document.getElementById('company')!.innerHTML = res.data?.company_name+'<i class="fa-sharp fa-solid fa-caret-down"></i>';
                      document.getElementById('company')!.setAttribute('disabled', '');
                    }else{
                        this.employment.searchCompany('').subscribe(
                        (res)=>{
                          this.Companies=res.data?.result

                          this.tempCompanies=JSON.parse(JSON.stringify(this.Companies));  

                        }
                      )
                    }
                })

    })

    }



  AdForm (data: JobDetials) {
     this.jobForm = this.fb.group({
       // if the purpose is to add an ad the value of control will be '' if  it is  edit get values from URL
       title:      [(data.id)?data.title: '', [Validators.required]],
       desc:       [(data.id)?data.desc: '', [Validators.required]], 
       phone:      [(data.id)?data.phone: '', [Validators.required]],
       email:      [(data.id)?data.email: '', [Validators.required]],
       salary:     [(data.id)?data.salary: '', [Validators.required]],
       address:    [(data.id)?data.address: '', [Validators.required]],
       company_id:    [this.company_id, [Validators.required]],
       experience:    [(data.id)?data.experience: '', [Validators.required]],
       category_id:    [this.category_id, [Validators.required]],
       work_hours:    [(data.id)?data.work_hours:'', [Validators.required]],

     })  
     
   }

   onSubmit(): void {


    const formData: FormData = new FormData()  
    
   console.log(this.jobForm.value)
    formData.append('title', this.jobForm.controls['title'].value);
    formData.append('desc',  this.jobForm.controls['desc'].value);
    formData.append('phone', this.jobForm.controls['phone'].value);
    formData.append('salary', this.jobForm.controls['salary'].value);
    formData.append('address', this.jobForm.controls['address'].value);
    formData.append('email', this.jobForm.controls['email'].value);
    formData.append('category_id', this.category_id+'');
    formData.append('experience', this.jobForm.controls['experience'].value);
    formData.append('company_id', this.company_id+'');
    formData.append('work_hours', this.jobForm.controls['work_hours'].value);


    //  formData.forEach(ite => console.log(ite))
    // console.log(formData)

 //createad


        this.employment.add_job(formData).subscribe( (res) => {
           console.log(res)

          this.toasterService.stopLoading();
          this.toasterService.showSuccess(res.message+'')
          this.router.navigate([`employment/job-details/${res.data?.job_detials.id}`])

        }, (err) => {
          this.toasterService.stopLoading();
          this.toasterService.showFail(err.error.error)

          // console.log(err)
        })


  }

  selectCategory(id:number,name:string){
    this.category_id=id;
    document.getElementById('category')!.innerHTML = name+'<i class="fa-sharp fa-solid fa-caret-down"></i>';

    document.getElementById("myDropdown1")!.classList.toggle("show");

  }

  selectCompany(id:number,name:string){
    this.company_id=id;
    document.getElementById('company')!.innerHTML = name+'<i class="fa-sharp fa-solid fa-caret-down"></i>';
    
    document.getElementById("myDropdown")!.classList.toggle("show");

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