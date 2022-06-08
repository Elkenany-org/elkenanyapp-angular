import { ChangeDetectorRef, Component, DoCheck, OnInit, Renderer2,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Gallery as Gallery2} from '@app/@core/interfaces/gallery/gallery';
import { GallaryService } from '@app/@core/services/app/gallery/gallary.service';

@Component({
  selector: 'app-about-gallery',
  templateUrl: './about-gallery.component.html',
  styleUrls: ['./about-gallery.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutGallery implements OnInit  {
  private id:number=  0
  public data?:Gallery2
  public addPlaceForm!: FormGroup
  public addRate!: FormGroup
  public rateValue:number=0


  constructor(private router : Router,
              private route:ActivatedRoute,
              private galleryService: GallaryService,
              private fb:FormBuilder) { }

  ngOnInit(): void {

    this.route.data.subscribe(data => {
      console.log(data);
      
    })
    let url =  this.router.url.split('/') 
    this.id=  +url[url.length-2]
    this.galleryService.gallery(this.id).subscribe(res => {
       this.data = res.data
       console.log(this.data)
    })
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
      this.galleryService.showers(this.id).subscribe(res => console.log(res))
    })
    formData.forEach(ite => console.log(ite))
  }

  sendRate() {
    const formData:FormData= new FormData
    formData.append('name',  this.addRate.controls['name'].value)
    formData.append('email', this.addRate.controls['email'].value)
    formData.append('desc',  this.addRate.controls['desc'].value)
    formData.append('rate',  this.addRate.controls['rate'].value)
    formData.append('show_id',this.id+'')
    this.galleryService.add_rate(formData).subscribe(res => {
    })
    formData.forEach(ite => console.log(ite))
  }


  
}


