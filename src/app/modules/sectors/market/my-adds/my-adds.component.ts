import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToasterService } from '@app/@core/services/toastr.service';
import { Banner } from '@app/@core/interfaces/_app/app-response';
import { Data, MyAd } from '@app/@core/interfaces/market/my-ads';
import { MarketService } from '@app/@core/services/modules/market/market.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-my-adds',
  templateUrl: './my-adds.component.html',
  styleUrls: ['./my-adds.component.scss']
})
export class MyAddsComponent implements OnInit {
  public type!:string
  public ads?:MyAd;

  ////////////


  public bamnner?:Banner

  constructor(
    private marketServices: MarketService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private router: Router,
    private titleService:Title
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle('اعلاناتي');
    let url =  this.router.url.split('/') 
    this.type =  url[url.length-2] //get type from url 

    this.marketServices.my_ads(this.type).subscribe(res => {
      this.toasterService.stopLoading();
      this.ads= res.data
    }, (err) => {
      this.toasterService.stopLoading();
      this.toasterService.showFail(err.error.error)
    })

  }



  editAd(id:number):void {
    this.router.navigate([`/market/${this.type}/add-edit-ad/${id}`])
  }
  removeAd(id:number):void { 
    let i = 
   
    // console.log(   this.ads?.data.indexOf(this.ads?.data.find(i => i.id == id) as Data))
  

    // this.ads?.data
    this.toasterService.loading('جارى التنفيذ...');

    this.marketServices.delete_ad(id).subscribe( 
      
      (res) => {
        // console.log(res.message)
        this.toasterService.stopLoading();
        let key = this.ads?.data.find(i => i.id == id) as Data



        const index =  this.ads?.data.indexOf(key);
    
        // console.log( index)
        // console.log(  this.ads?.data)
        if (index && index > -1) {
          this.ads?.data.splice(index, 1);
          // console.log(  this.ads?.data)
        }
        this.toasterService.showSuccess(res.message+'')

      },(err) => {
        // console.log(err.error.error)
        this.toasterService.stopLoading();
        this.toasterService.showFail(err.error.error)

      }
    )
  }


}
