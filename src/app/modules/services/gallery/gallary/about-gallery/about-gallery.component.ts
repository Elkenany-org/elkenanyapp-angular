import { ChangeDetectorRef, Component, DoCheck, OnInit, Renderer2,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Gallery} from '@app/@core/interfaces/gallery/gallery';
import { GallaryService } from '@app/@core/services/modules/gallery/gallary.service';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-about-gallery',
  templateUrl: './about-gallery.component.html',
  styleUrls: ['./about-gallery.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutGallery implements OnInit  {
  private id:number=  0
  public type:string= "poultry"
  public data?:Gallery
  public addPlaceForm!: FormGroup
  public addRate!: FormGroup
  public rateValue:number=0
  message=''
  IsmodelShow=false;
  constructor(private router : Router,
              private route:ActivatedRoute,
              private galleryService: GallaryService,
              private fb:FormBuilder,
              private titleService:Title) { }

  ngOnInit(): void {

    this.route.data.subscribe(data => {
      this.data = data['resolve'].data
     this.titleService.setTitle(this.data?.name!);
    })
    let url =  this.router.url.split('/') 
    this.id=  +url[url.length-3]
    this.type=  url[url.length-4]

    // this.galleryService.gallery(this.id).subscribe(res => {
    //    this.data = res.data
    //     console.log(this.data)
    //    this.titleService.setTitle(this.data?.name!);

    // })
    this.addPlaceForm =this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      company: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      desc: ['', [Validators.required]],
      show_id: ['', [Validators.required]],

    })
    this.addRate =this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      desc: ['', [Validators.required]],
      show_id: ['', [Validators.required]],
      rate: ['', [Validators.required]],
    })
  }
  addPlace() {
    const formData:FormData= new FormData
    formData.append('name',   this.addPlaceForm.controls['name'].value)
    formData.append('email',  this.addPlaceForm.controls['email'].value)
    formData.append('company',this.addPlaceForm.controls['company'].value)
    formData.append('phone',  this.addPlaceForm.controls['phone'].value)
    formData.append('desc',   this.addPlaceForm.controls['desc'].value)
    formData.append('show_id', this.id+'')
    this.galleryService.add_place(formData).subscribe(res => {
      let btn =document.getElementById('close1');
      btn?.click();
      this.message=res.message!
      window.setTimeout(() => {
        this.message=''
      }, 5000);
      // this.galleryService.showers(this.id).subscribe(res => 
      //   {console.log(res)

      // })
    })
    // formData.forEach(ite => console.log(ite))
  }

  sendRate() {
    const formData:FormData= new FormData

    formData.append('name',  this.addRate.controls['name'].value)
    formData.append('email', this.addRate.controls['email'].value)
    formData.append('desc',  this.addRate.controls['desc'].value)
    formData.append('rate',  this.addRate.controls['rate'].value)
    formData.append('show_id',this.id+'')
    this.galleryService.add_rate(formData).subscribe(res => {
      let btn =document.getElementById('close2');
      btn?.click();
      this.message=res.message!
      window.setTimeout(() => {
        this.message=''
      }, 5000);
      
    })
    // formData.forEach(ite => console.log(ite))

  }

  going(){   
    let element=document.getElementById("going")
    if(element?.innerText=='الذهاب'){
    this.galleryService.add_going({show_id:this.id}).subscribe(res => {
      // console.log(res)
      element!.innerText="عدم الذهاب"
      this.message=res.message!

      window.setTimeout(() => {
              this.message=''
      }, 5000);
   },
    err=>{
      this.router.navigate(['/user/login']);
    }
  )
    }
    else if(element?.innerText=="عدم الذهاب"){
      this.galleryService.not_going({show_id:this.id}).subscribe(res => {
        // console.log(res)
        this.message=res.message!
        element!.innerText="الذهاب"
        window.setTimeout(() => {
          this.message=''
  }, 5000);
     }
    )
    }

}


}


