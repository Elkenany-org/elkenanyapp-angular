import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router, } from '@angular/router';
import { sector } from '@app/@core/@data/app/filter-list';
import { AdDetials } from '@app/@core/interfaces/market/ad';
import { Sector } from '@app/@core/interfaces/_app/app-response';
import { MarketService } from '@app/@core/services/modules/market/market.service';
import { ToasterService } from '@app/@core/services/toastr.service';



interface ImageInterface {
  name?: string;
  file: File;
  fileResult: any;  
}
@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.component.html',
  styleUrls: ['./add-ad.component.scss']
})
export class AddAdComponent implements OnInit {
  adForm!: FormGroup
  pageName:string ="إضافة إعلان"


  previousUrl?:string
  AllFiles: ImageInterface[] = [];
  currentImage: ImageInterface[] = [];//it is come from edit api
  new_Image: ImageInterface[] = []; // it is for new image that may be  will add for edite api

  id :string = ''
  url:string[]=[]
  constructor(
    private market: MarketService,
    private router: Router,
    private toasterService: ToasterService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private titleService:Title) { 


    }

  ngOnInit(): void {
    this.titleService.setTitle(this.pageName);

    this.url =  this.router.url.split('/') 
    let secId = sector.find((i:Sector) => i.type ===   this.url[  this.url.length-3] )?.id ||0
    // console.log(  this.url)
    this.AdForm({} as AdDetials, secId )

    this.route.params.subscribe( (param: Params) => {
        this.id = param['id']

        if(this.id !== '0') { // if it = 0 its mean user want to add ad if > 0 means user wants to edite
          this.pageName = "تعديل إعلان"
          this.market.get_ad(this.id ).subscribe( res => {
            // console.log(res)
            res.data?.ad_detials.images.forEach(i => this.AllFiles.push( {
              name: '',
              file: {} as File,
              fileResult: i.image
            } ))

            res.data?.ad_detials.images.forEach(i => this.currentImage.push( {
              name: '',
              file: {} as File,
              fileResult: i.image
            } ))


            // this.AllFiles = res.data?.ad_detials.images as any
            // console.log( this.AllFiles)
           this.AdForm(res.data?.ad_detials as AdDetials ,secId)
          })
        }
    })
  }


  handleFileInput(event: any): void {
    const fileList = event.target.files;
    if (fileList.length > 0) {
      for (const file of fileList) {
        // console.log(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (e) => {
           this.toasterService.loading('جارى رفع الملفات...');
           this.new_Image.push({fileResult: reader.result, file, name: file.name});
           this.AllFiles.push({fileResult: reader.result, file, name: file.name});
console.log('====================================');
console.log(reader.result);
console.log('====================================');
        };
        reader.onloadend = (ee) => {
          this.toasterService.stopLoading();
        };
      }
    }

  }

  removeImage(name: string | undefined): void {
    this.AllFiles = this.AllFiles.filter((image) => {
      return image.name !== name;
    });
    
  }

  onSubmit(): void {





    const formData: FormData = new FormData()
    // console.log(this.adForm.value)
    formData.append('title', this.adForm.controls['title'].value);
    formData.append('desc',  this.adForm.controls['desc'].value);
    formData.append('phone', this.adForm.controls['phone'].value);
    formData.append('salary', this.adForm.controls['salary'].value);
    formData.append('section_id', this.adForm.controls['section_id'].value);
    formData.append('address', this.adForm.controls['address'].value);
    formData.append('con_type', this.adForm.controls['con_type'].value);



    // formData.forEach(ite => console.log(ite))
    // console.log(formData)

    if(this.id != '0'){ //edit ad


  

      if(!(this.currentImage.length >0  || this.new_Image.length>0 )){
        this.toasterService.showFail('يجب رفع صورة')
        return
      }
  
      formData.append('id', this.id);
      formData.append('oldImages', JSON.stringify(this.currentImage));
      formData.append('NewImages', JSON.stringify(this.new_Image));
      this.toasterService.loading('جارى التعديل...');

      
      this.market.edit_ad(formData).subscribe( (res) => {
        this.toasterService.stopLoading();
      this.toasterService.showSuccess(res.message+'')
      this.router.navigate([`/market/${this.url[2]}/ad_details/${res.data?.ad_detials.id}`])
    }, (err) => {
        this.toasterService.stopLoading();
        this.toasterService.showFail(err.error.error)

        // console.log(err)
      })
    }else{//createad
      
      if(this.AllFiles.length <= 0){
        this.toasterService.showFail('يجب رفع صورة')
        return
      }
      formData.append('images', JSON.stringify(this.AllFiles));
      this.toasterService.loading('جارى التحميل...');

        this.market.add_ad(formData).subscribe( (res) => {
          // console.log(res)
          // console.log(`/market/${this.url[2]}/ad_details/${res.data?.ad_detials.id}`)
          this.toasterService.stopLoading();
          this.toasterService.showSuccess(res.message+'')
          this.router.navigate([`/market/${this.url[2]}/ad_details/${res.data?.ad_detials.id}`])

        }, (err) => {
          this.toasterService.stopLoading();
          this.toasterService.showFail(err.error.error)

          // console.log(err)
        })
    }


  }



  AdForm (data: AdDetials, secId: number) {
   if ( secId > 0) {
    this.adForm = this.fb.group({
      // if the purpose is to add an ad the value of control will be '' if  it is  edit get values from URL
      title:      [(data.id)?data.title: '', [Validators.required]],
      desc:       [(data.id)?data.desc: '', [Validators.required]], 
      phone:      [(data.id)?data.phone: '', [Validators.required]],
      salary:     [(data.id)?data.salary: '', [Validators.required]],
      address:    [(data.id)?data.address: '', [Validators.required]],
      con_type:   [(data.id)?data.con_type: 'mobile', [Validators.required]],
      section_id: [secId, [Validators.required]],

    })  
   }
    
  }
  changeType(e:Event):void {  
    this.adForm.controls['con_type'].setValue((<HTMLInputElement>e.target).value)
  }

  deleteImages(): void {
    this.AllFiles=[]
    this.currentImage=[]
    this.new_Image=[]
  }

}










